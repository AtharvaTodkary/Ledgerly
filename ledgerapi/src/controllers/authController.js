const bcrypt = require("bcryptjs");
const User = require("../models/User");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  REFRESH_TOKEN_EXPIRES_IN,
} = require("../config/jwt");

const REFRESH_COOKIE_NAME = process.env.REFRESH_COOKIE_NAME || "refreshToken";
const INCLUDE_REFRESH_TOKEN_IN_RESPONSE = process.env.INCLUDE_REFRESH_TOKEN_IN_RESPONSE !== "false";
const DEFAULT_REFRESH_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

const parseDurationToMs = (value) => {
  if (!value) return DEFAULT_REFRESH_MAX_AGE_MS;
  if (typeof value === "number") return value * 1000;

  const match = String(value).trim().match(/^(\d+)([smhd])$/i);
  if (!match) return DEFAULT_REFRESH_MAX_AGE_MS;

  const amount = Number(match[1]);
  const unit = match[2].toLowerCase();
  const multipliers = {
    s: 1000,
    m: 60 * 1000,
    h: 60 * 60 * 1000,
    d: 24 * 60 * 60 * 1000,
  };

  return amount * multipliers[unit];
};

const refreshCookieOptions = () => {
  const secure = process.env.REFRESH_COOKIE_SECURE === "true";
  return {
    httpOnly: true,
    secure,
    sameSite: process.env.REFRESH_COOKIE_SAMESITE || (secure ? "none" : "lax"),
    path: "/api/auth",
    maxAge: parseDurationToMs(REFRESH_TOKEN_EXPIRES_IN),
  };
};

const clearRefreshCookie = (res) => {
  res.clearCookie(REFRESH_COOKIE_NAME, refreshCookieOptions());
};

const getIncomingRefreshToken = (req) => {
  return req.cookies?.[REFRESH_COOKIE_NAME] || req.body?.refreshToken || null;
};

const invalidateStoredRefreshToken = async (userId) => {
  await User.findByIdAndUpdate(userId, { $unset: { refreshToken: 1 } });
};

const sendTokenResponse = async (user, statusCode, res, message) => {
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  const refreshTokenHash = await bcrypt.hash(
    refreshToken,
    parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 12,
  );

  await User.findByIdAndUpdate(user._id, { refreshToken: refreshTokenHash });
  res.cookie(REFRESH_COOKIE_NAME, refreshToken, refreshCookieOptions());

  const data = {
    accessToken,
    user: user?.toJSON ? user.toJSON() : user,
  };

  if (INCLUDE_REFRESH_TOKEN_IN_RESPONSE) {
    data.refreshToken = refreshToken;
  }

  return res.status(statusCode).json({
    success: true,
    message: message || "Authentication successful.",
    data,
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and password.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered.",
      });
    }

    const user = await User.create({ name, email, password });
    await sendTokenResponse(user, 201, res, "Registration successful.");
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password.",
      });
    }

    // Explicitly select password since it's excluded by default
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    await sendTokenResponse(user, 200, res, "Login successful.");
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged-in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public
const refreshToken = async (req, res, next) => {
  try {
    const incomingRefreshToken = getIncomingRefreshToken(req);

    if (!incomingRefreshToken) {
      clearRefreshCookie(res);
      return res.status(400).json({
        success: false,
        message: "Refresh token is required.",
      });
    }

    let decoded;
    try {
      decoded = verifyRefreshToken(incomingRefreshToken);
    } catch (error) {
      clearRefreshCookie(res);
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token.",
      });
    }

    const user = await User.findById(decoded.id).select("+refreshToken");

    if (!user || !user.refreshToken) {
      clearRefreshCookie(res);
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token.",
      });
    }

    const isTokenMatch = await bcrypt.compare(incomingRefreshToken, user.refreshToken);
    if (!isTokenMatch) {
      await invalidateStoredRefreshToken(user._id);
      clearRefreshCookie(res);
      return res.status(401).json({
        success: false,
        message: "Refresh token is no longer valid. Please log in again.",
      });
    }

    await sendTokenResponse(user, 200, res, "Token refreshed successfully.");
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
const logout = async (req, res, next) => {
  try {
    const incomingRefreshToken = getIncomingRefreshToken(req);

    if (incomingRefreshToken) {
      try {
        const decoded = verifyRefreshToken(incomingRefreshToken);
        await invalidateStoredRefreshToken(decoded.id);
      } catch (error) {
        // Always clear cookie, even for invalid refresh tokens.
      }
    }

    clearRefreshCookie(res);
    return res.status(200).json({
      success: true,
      message: "Logout successful.",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update password
// @route   PUT /api/auth/update-password
// @access  Private
const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide current and new password.",
      });
    }

    const user = await User.findById(req.user._id).select("+password");
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    user.password = newPassword;
    await user.save();

    await sendTokenResponse(user, 200, res, "Password updated successfully.");
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, logout, getMe, refreshToken, updatePassword };

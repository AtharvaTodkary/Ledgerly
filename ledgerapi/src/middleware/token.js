const { generateAccessToken, generateRefreshToken } = require("../config/jwt");

const sendTokenResponse = async (user, statusCode, res, next) => {
  try {
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    await User.findOneAndUpdate(
      {
        _id: user?._id,
      },
      {
        refreshToken: refreshToken,
      },
    );

    let response = {
      success: true,
      accessToken,
      refreshToken,
      user,
    };

    return res.status(statusCode).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = { sendTokenResponse };

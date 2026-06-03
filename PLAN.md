## Refresh Token Contract Audit and Fix Plan

### Summary
Current refresh flow is not correct end-to-end. The main break is contract mismatch: backend `POST /api/auth/refresh` expects `req.body.refreshToken`, while UI calls refresh with `null` body and expects cookie/session-based behavior.  
We will implement a **hybrid transition** with **strict rotation** and **single active session per user** (per your selections), so both old and new clients work while moving UI to cookie-based refresh.

### Key Changes
1. **Backend token contract (hybrid + strict + single-session)**
- Update refresh endpoint to accept token from:
  1. HttpOnly cookie (primary)
  2. Request body `refreshToken` (legacy fallback)
- Keep returning `accessToken` and `user`; optionally keep returning `refreshToken` only during transition window.
- Add strict validation:
  - Verify JWT signature/expiry
  - Check user exists
  - Check presented refresh token matches stored active token for that user
  - Rotate refresh token on every login/register/refresh/password-change
  - Reject stale/reused token and clear stored refresh token
- Store refresh token securely at rest (hashed) while keeping single active token per user.
- Add/complete `POST /api/auth/logout` to invalidate stored token and clear cookie.

2. **Backend cookie + server setup**
- Add cookie parsing support and cookie read/write in auth controller.
- Set refresh cookie on login/register/refresh/update-password with env-driven options:
  - `httpOnly: true`
  - `secure`: env-based
  - `sameSite`: env-based
  - `path: /api/auth`
  - `maxAge`: refresh TTL
- Clear cookie on logout and refresh failure.
- Tighten CORS origin handling for credentialed requests (explicit allowlist, not blind reflection).

3. **UI refresh flow alignment**
- Change UI refresh calls to cookie-first (no body token required for new flow).
- Keep optional ability to send body token only if explicitly present (transition compatibility).
- Ensure auth state updates on refresh success persist new access token consistently.
- Remove reliance on `withCredentials` as a substitute for body token; keep it only for cookie transport.
- Ensure logout flow clears client auth storage and calls backend logout endpoint.

4. **Contract cleanup**
- Define a stable auth API response shape for `login/register/refresh/logout`.
- Remove duplicate/legacy auth page logic paths after verification (to avoid future drift).
- Update docs/examples to show cookie-first refresh with hybrid fallback window.

### API / Interface Changes
- `POST /api/auth/refresh`
  - **Before:** requires body `{ refreshToken }`
  - **After:** accepts cookie token (primary) or body token (fallback); returns rotated credentials.
- `POST /api/auth/logout`
  - Added/standardized to revoke refresh session and clear cookie.
- New backend env knobs (names can follow existing style):
  - `REFRESH_COOKIE_NAME`
  - `REFRESH_COOKIE_SECURE`
  - `REFRESH_COOKIE_SAMESITE`
  - `REFRESH_TOKEN_EXPIRES_IN`
  - `CORS_ORIGIN` (allowlist)

### Test Plan
1. Login succeeds, cookie is set, access token works on protected routes.
2. Access token expiry triggers interceptor refresh; request retries successfully.
3. Refresh works with cookie only (new flow).
4. Refresh works with body `refreshToken` (legacy flow).
5. Rotated refresh token invalidates prior token (single-session strict rotation).
6. Reuse of old refresh token returns 401 and invalidates session.
7. Logout revokes refresh token, clears cookie, and future refresh fails.
8. App reload with expired access token + valid refresh cookie restores session.
9. Cross-origin credential request works only for configured allowed origins.

### Assumptions
- We are intentionally migrating to cookie-first refresh, but keeping body-token compatibility temporarily.
- Single active session per user is desired (new login invalidates prior refresh session).
- Strict rotation includes stale-token rejection and revocation behavior.
- UI and API run on compatible domains/ports for credentialed cookie transport in your environments.

# Express.js Auth App

A production-ready Express.js REST API with JWT authentication, bcrypt password hashing, CORS, and MongoDB via Mongoose.

## Tech Stack

| Package | Purpose |
|---|---|
| `express` | Web framework |
| `bcryptjs` | Password hashing |
| `jsonwebtoken` | JWT access & refresh tokens |
| `mongoose` | MongoDB ODM |
| `cors` | Cross-origin resource sharing |
| `dotenv` | Environment variable management |

## Project Structure

```
src/
├── config/
│   ├── db.js          # MongoDB connection
│   └── jwt.js         # Token generation & verification
├── controllers/
│   ├── authController.js
│   └── userController.js
├── middleware/
│   ├── auth.js         # protect + restrictTo middleware
│   └── errorHandler.js
├── models/
│   └── User.js         # Mongoose schema with bcrypt hook
├── routes/
│   ├── authRoutes.js
│   └── userRoutes.js
└── server.js            # App entry point
```

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI and a strong JWT_SECRET

# 3. Start (development)
npm run dev

# 4. Start (production)
npm start
```

## API Endpoints

### Auth — `/api/auth`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/register` | Public | Register a new user |
| POST | `/login` | Public | Login and get tokens |
| POST | `/refresh` | Public | Refresh access token |
| GET | `/me` | Private | Get current user |
| PUT | `/update-password` | Private | Change password |

### Users — `/api/users`

| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/` | Admin | List all users |
| GET | `/:id` | Admin | Get user by ID |
| PUT | `/me` | Private | Update own profile |
| DELETE | `/me` | Private | Delete own account |

### Other

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Health check |

## Example Requests

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"secret123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"secret123"}'
```

### Authenticated Request
```bash
curl http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer <your_access_token>"
```

### Refresh Token
```bash
curl -X POST http://localhost:3000/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"<your_refresh_token>"}'
```

## Security Notes

- Passwords are hashed with bcrypt (configurable salt rounds via `BCRYPT_SALT_ROUNDS`)
- JWT access tokens expire in 7 days (configurable via `JWT_EXPIRES_IN`)
- Refresh tokens expire in 30 days and use a separate secret
- Passwords are never returned in API responses (`select: false`)
- Request body size is limited to 10kb
- Role-based access control via `restrictTo("admin")` middleware
# CryptoArmory Backend (NestJS)

## Setup

1. Create `.env` (see `.env.example`).
2. Install deps:
```bash
npm i
```
3. Run dev:
```bash
npm run start:dev
```
4. Swagger Docs: `http://localhost:4000/api/docs` (Bearer auth supported).

## Env
- `PORT=4000`
- `MONGO_URI=mongodb+srv://...`
- `JWT_SECRET=...`
- `SMTP_HOST=...`
- `SMTP_PORT=587`
- `SMTP_USER=...`
- `SMTP_PASS=...`
- `SMTP_FROM=no-reply@example.com`

## Modules
- Auth: `/api/auth/signup`, `/api/auth/login`, `/api/auth/send-otp`, `/api/auth/verify-otp`
- Investments: `/api/investments` (POST create {planId, amount}, GET list), `/api/investments/:id/approve`
- Notifications: `/api/notifications`, `/api/notifications/unread-count`, `/api/notifications/:id/read`, `/api/notifications/read-all`
- Transactions: `/api/transactions/withdraw`

Security: JWT Bearer, global validation pipes, Helmet, CORS.




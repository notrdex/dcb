# Discord Bot — Railway

A modular Discord bot foundation designed for Railway deployment and future Render dashboard integration.

## Requirements

- Node.js 20+
- Discord application + bot
- MongoDB Atlas database
- Railway account
- GitHub repository

## Local setup

```bash
npm install
```

Copy `.env.example` to `.env` and fill in:

```env
DISCORD_TOKEN=your_bot_token
DISCORD_CLIENT_ID=your_application_id
MONGODB_URI=your_mongodb_connection_string
DASHBOARD_URL=
API_SECRET=
```

Start:

```bash
npm start
```

## Railway

Railway should detect Node automatically.

Build/install command:

```bash
npm install
```

Start command:

```bash
npm start
```

Add the variables from `.env.example` in Railway Variables.

Do NOT upload `.env` to GitHub.

## Current modules

- Bot startup
- MongoDB connection
- Guild join/leave logging
- `/ping`
- Modular command loader
- Modular event loader
- Per-guild configuration model

The project is intentionally structured so future dashboard modules can be added without rewriting the bot core.

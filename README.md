# GiftLink — Fullstack Capstone Project

A full-stack web application connecting people who want to give away household items with those who prefer to recycle or find free items.

## Repository Name
**fullstack-capstone-project**

## Tech Stack
- **Backend:** Node.js, Express
- **Database:** MongoDB (NoSQL)
- **Auth:** JWT (JSON Web Tokens)
- **Frontend:** React
- **DevOps:** Docker, GitHub Actions, Git

## Features
- User registration & secure login (JWT)
- Item listings with detailed views
- Search & filter by category
- Comments/reviews on items
- Editable user profiles
- Concurrency-safe operations

## User Stories

### new
- As a new user, I want to register an account so I can start listing items.
- As a new user, I want to log in securely so only I can access my profile.

### c2c
- As a user, I want to list an item I no longer need so someone else can reuse it.
- As a user, I want to browse items by category so I can find things I need.
- As a user, I want to search for items by keyword so I can quickly find specific things.
- As a user, I want to comment on an item so I can ask the owner questions.

### technical debt
- As a developer, I want secure JWT authentication so user data is protected.
- As a developer, I want concurrency-safe review operations so data stays consistent.

### backlog
- As a user, I want to edit my profile so my information stays up to date.
- As a user, I want to see detailed item views so I know exactly what I'm getting.

## Setup

\`\`\`bash
npm install
npm start
\`\`\`

Server runs on `http://localhost:3000`

## License
MIT
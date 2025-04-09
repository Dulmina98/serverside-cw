# Country API Middleware Service

A secure RESTful API middleware service interfacing with [RestCountries.com](https://restcountries.com/), built with
Node.js, Express, SQLite, and a React frontend, containerized using Docker.

## Overview

This project provides a middleware API that fetches country data from RestCountries.com, secured with API key
authentication and user management. The React frontend offers user registration, login, API key management, and country
details retrieval, with a responsive navigation bar built using React Bootstrap.

## Features

- Retrieve filtered country data (name, currency, capital, languages, flag) from RestCountries.com.
- User authentication (register, login, logout) with JWT-based session management.
- API key management (generate, revoke) with usage tracking (last used, usage count).
- Frontend interface built with React and React Bootstrap for seamless user interaction.
- Fully containerized with Docker for consistent deployment.

## Prerequisites

- Node.js (v22 recommended)
- Docker and Docker Compose
- Git

## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Dulmina98/serverside-cw.git
   cd serverside-cw
   ```

2. **Install Backend Dependencies:**
   ```bash
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Configure Environment Variables:**
    - Create a `.env` file in the root directory with:
      ```plaintext
      PORT=3000
      JWT_SECRET=your-very-secret-key-12345  # Replace with a strong, random string
      NODE_ENV=production
      ```

5. **Build the React App:**
   ```bash
   cd frontend
   npm run build
   cd ..
   ```

6. **Run Locally:**
   ```bash
   node server.js
   ```
    - Access at `http://localhost:3000`.

7. **Run with Docker:**
   ```bash
   docker compose up --build
   ```
    - Access at `http://localhost:3000`.
    - Stop with `docker compose down`.

## Usage

- **Register:** Visit `http://localhost:3000/` to create an account.
- **Login:** Go to `/login`, sign in, and access the admin dashboard at `/admin`.
- **API Key Management:** Generate and revoke API keys in the admin dashboard.
- **Fetch Country Details:** Enter a country name (e.g., "Japan") in the admin dashboard to retrieve details.
- **API Access:** Use an active API key in the `X-API-Key` header to call `/api/countries` or `/api/countries/:name`.

## Project Structure

```
serverside-cw/
├── Dockerfile              # Docker configuration
├── README.md               # Project overview
├── data/                   # SQLite database storage
│   └── countries.db        # SQLite database file
├── docker-compose.yml      # Docker Compose configuration
├── frontend/               # React frontend
│   ├── README.md           # Frontend-specific readme
│   ├── build/              # Compiled React app
│   │   ├── index.html      # Main HTML file
│   │   └── static/         # Static assets (CSS, JS)
│   ├── package.json        # Frontend dependencies
│   ├── public/             # Public assets (icons, manifest)
│   └── src/                # Frontend source code
│       ├── App.js          # Main app with routing
│       ├── components/     # React components
│       │   ├── admin.js    # Admin dashboard
│       │   ├── login.js    # Login page
│       │   ├── navigation-bar.js # Navigation bar with logout
│       │   └── register.js # Registration page
│       ├── index.js        # Entry point for React
│       └── App.css         # Basic styling
├── middleware/             # Authentication middleware
│   └── auth.js             # Token and API key verification
├── models/                 # SQLite database models
│   └── database.js         # Database setup and schema
├── package.json            # Backend dependencies
├── routes/                 # API and admin routes
│   ├── admin.js            # Admin endpoints
│   ├── api.js              # Country API endpoints
│   └── auth.js             # Authentication endpoints
├── server.js               # Express server
└── test-db.js              # Database testing script (optional)
```

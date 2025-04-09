# API Documentation

This document details the RESTful API endpoints provided by the Country API Middleware Service. All endpoints follow
REST principles, return JSON responses, and require authentication where specified.

## Base URL

- Local: `http://localhost:3000`
- Docker: `http://localhost:3000` (default port)

## Authentication Endpoints

### POST /auth/register

- **Description**: Register a new user.
- **Request Body**:

```
{
"username": "string" (min 3, max 30),
"email": "string" (valid email),
"password": "string" (min 6)
}
```

- **Response** (201):

```
{ "message": "User registered" }
```

- **Error** (400):

```
{ "error": "User already exists" }
```

### POST /auth/login

- **Description**: Log in a user and return a JWT token.
- **Request Body**:

```
{
"email": "string" (valid email),
"password": "string"
}
```

- **Response** (200):

```
{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
```

- **Error** (401):

```
{ "error": "Invalid credentials" }
```

## API Endpoints (Require X-API-Key Header)

### GET /api/countries

- **Description**: Retrieve a list of all countries.
- **Headers**: `X-API-Key: <your-api-key>`
- **Response** (200):

```
[
{
"name": "Afghanistan",
"currency": { "AFN": { "name": "Afghan afghani", "symbol": "؋" } },
"capital": ["Kabul"],
"languages": { "prs": "Dari", "pus": "Pashto", "tuk": "Turkmen" },
"flag": "https://flagcdn.com/w320/af.png"
},
...
]
```

- **Error** (401):

```
{ "error": "No API key provided" }
```

### GET /api/countries/:name

- **Description**: Retrieve details for a specific country.
- **Headers**: `X-API-Key: <your-api-key>`
- **Parameters**: `:name` (e.g., "japan")
- **Response** (200):

```
{
"name": "Japan",
"currency": { "JPY": { "name": "Japanese yen", "symbol": "¥" } },
"capital": ["Tokyo"],
"languages": { "jpn": "Japanese" },
"flag": "https://flagcdn.com/w320/jp.png"
}
```

- **Error** (404):

```
{ "error": "Country not found" }
```

## Admin Endpoints (Require Authorization: Bearer <token>)

### GET /admin

- **Description**: Retrieve the user’s API keys.
- **Headers**: `Authorization: Bearer <jwt-token>`
- **Response** (200):

```
{
"keys": [
{
"id": 1,
"api_key": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
"created_at": "2025-04-09T12:00:00Z",
"last_used": "2025-04-09T12:05:00Z",
"usage_count": 3,
"is_active": 1
},
...
]
}
```

- **Error** (401):

```
{ "error": "No token provided" }
```

### POST /admin/keys/generate

- **Description**: Generate a new API key for the authenticated user.
- **Headers**: `Authorization: Bearer <jwt-token>`
- **Response** (200):

```
{ "message": "Key generated" }
```

- **Error** (500):

```
{ "error": "Failed to generate key" }
```

### POST /admin/keys/:id/revoke

- **Description**: Revoke an existing API key by ID.
- **Headers**: `Authorization: Bearer <jwt-token>`
- **Parameters**: `:id` (e.g., 1)
- **Response** (200):

```
{ "message": "Key revoked" }
```

- **Error** (500Mixed:

```
{ "error": "Failed to revoke key" }
```

## Security Notes

- **API Key Authentication**: Required for `/api/*` endpoints, validated against the `api_keys` table.
- **JWT Authentication**: Required for `/admin/*` endpoints, expires after 1 hour.
- **Usage Tracking**: API key usage is tracked with `last_used` and `usage_count` fields.
- **Session Management**: Logout clears the JWT from localStorage and redirects to login.

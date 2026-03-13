# API Specification

This document describes the expected API responses for the frontend implementation.

## Authentication

All requests include credentials (HTTP-only cookies) via `withCredentials: true`.

Authorization header: `Bearer {access_token}` (stored in localStorage as `tl_access_token`)

## Endpoints

### Posts

#### GET /posts
Returns array of all posts.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Breaking: Major News Event",
    "content": "Full article content here...",
    "author": {
      "id": 123,
      "username": "john_doe",
      "email": "john@example.com"
    },
    "prediction": {
      "label": "Real",
      "fake_confidence": 0.15,
      "real_confidence": 0.85
    },
    "comments_count": 5,
    "likes_count": 12,
    "created_at": "2024-03-15T10:30:00Z"
  }
]
```

#### GET /posts/{id}
Returns single post by ID.

**Response:**
```json
{
  "id": 1,
  "title": "Breaking: Major News Event",
  "content": "Full article content here...",
  "author": {
    "id": 123,
    "username": "john_doe",
    "email": "john@example.com"
  },
  "prediction": {
    "label": "Fake",
    "fake_confidence": 0.78,
    "real_confidence": 0.22
  },
  "comments_count": 5,
  "likes_count": 12,
  "created_at": "2024-03-15T10:30:00Z",
  "comments": [
    {
      "id": 1,
      "content": "Great analysis!",
      "user_id": 456,
      "post_id": 1,
      "created_at": "2024-03-15T11:00:00Z"
    }
  ]
}
```

#### POST /posts
Creates a new post.

**Request Body:**
```json
{
  "title": "Post Title",
  "content": "Post content here..."
}
```

**Response:**
```json
{
  "id": 2,
  "title": "Post Title",
  "content": "Post content here...",
  "author": {
    "id": 123,
    "username": "john_doe",
    "email": "john@example.com"
  },
  "prediction": {
    "label": "Real",
    "fake_confidence": 0.25,
    "real_confidence": 0.75
  },
  "comments_count": 0,
  "likes_count": 0,
  "created_at": "2024-03-15T12:00:00Z"
}
```

#### DELETE /posts/{id}
Deletes a post (owner only).

**Response:** 204 No Content

---

### Users

#### GET /auth/me
Returns current authenticated user.

**Response:**
```json
{
  "id": 123,
  "username": "john_doe",
  "email": "john@example.com",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

---

### Authentication

#### POST /auth/signup
Creates new user account.

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 123,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

#### POST /auth/login
Authenticates existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 123,
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

---

### Prediction

#### POST /predict
Analyzes text for fake news detection.

**Request Body:**
```json
{
  "text": "Article or claim text to analyze..."
}
```

**Response:**
```json
{
  "label": "Fake",
  "fake_confidence": 0.78,
  "real_confidence": 0.22
}
```

**Note:** The backend may return different field names. The frontend expects:
- `label`: "Real" or "Fake"
- `fake_confidence`: number between 0 and 1
- `real_confidence`: number between 0 and 1

---

### Comments

#### GET /comments/{postId}
Returns all comments for a post.

**Response:**
```json
[
  {
    "id": 1,
    "content": "Great analysis!",
    "user_id": 456,
    "post_id": 1,
    "created_at": "2024-03-15T11:00:00Z"
  },
  {
    "id": 2,
    "content": "I disagree with this assessment.",
    "user_id": 789,
    "post_id": 1,
    "created_at": "2024-03-15T11:30:00Z"
  }
]
```

#### POST /comments/{postId}
Creates a new comment on a post.

**Request Body:**
```json
{
  "content": "This is my comment"
}
```

**Response:**
```json
{
  "id": 3,
  "content": "This is my comment",
  "user_id": 123,
  "post_id": 1,
  "created_at": "2024-03-15T12:00:00Z"
}
```

#### DELETE /comments/{commentId}
Deletes a comment (owner only).

**Response:** 204 No Content

---

### Likes

#### POST /likes
Likes a post.

**Request Body:**
```json
{
  "postId": "1"
}
```

**Response:**
```json
{
  "likesCount": 13
}
```

---

## Error Responses

All endpoints may return error responses in this format:

```json
{
  "detail": "Error message here"
}
```

Common HTTP status codes:
- `400` - Bad Request (validation error)
- `401` - Unauthorized (not logged in)
- `403` - Forbidden (not allowed)
- `404` - Not Found
- `500` - Internal Server Error

---

## Notes

### Type Conversions

The frontend handles these conversions:
- Post IDs are numbers in API, converted to strings for routing
- User IDs are numbers
- Timestamps are ISO 8601 strings
- Confidence values are decimals (0-1), displayed as percentages (0-100)

### Authentication Flow

1. User logs in via `/auth/login` or `/auth/signup`
2. Backend returns `access_token` and `user` object
3. Frontend stores token in localStorage as `tl_access_token`
4. Frontend stores user in Zustand store (persisted)
5. All subsequent requests include token in Authorization header
6. Backend also uses HTTP-only cookies for additional security

### Prediction Integration

The prediction can be run independently before posting:
1. User enters content in CreatePostForm
2. User clicks "Run AI prediction"
3. Frontend calls `/predict` with content
4. Prediction result is displayed but not stored
5. When user submits post, backend runs prediction again
6. Backend stores post with its own prediction result

This means the frontend prediction is for preview only. The backend always generates the final prediction when creating a post.

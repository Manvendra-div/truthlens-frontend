# Post Feed System & User Integration - Implementation Guide

## Overview

This document describes the implementation of the Post feed system and User integration for the TruthLens news feed application.

## Architecture

### Type System

#### User Type (`types/user.ts`)
```typescript
{
  id: number
  username: string
  email: string
  createdAt?: string
}
```

#### Prediction Type (`types/prediction.ts`)
```typescript
{
  label: "Real" | "Fake"
  fake_confidence: number
  real_confidence: number
}
```

#### Post Type (`types/post.ts`)
```typescript
{
  id: number
  title: string
  content: string
  author: User
  prediction: Prediction
  comments_count: number
  created_at: string
  likes_count?: number
  comments?: Comment[]
}
```

### API Integration

#### Posts API (`lib/api/posts.ts`)
- `getPosts()` - Fetch all posts
- `getPost(postId)` - Fetch single post
- `createPost(title, content)` - Create new post
- `deletePost(postId)` - Delete post

#### Users API (`lib/api/users.ts`)
- `getCurrentUser()` - Get authenticated user (GET /auth/me)

All API calls include `credentials: "include"` for cookie-based authentication.

### Components

#### Post Components (`components/posts/`)

1. **PostCard** - Individual post display
   - Shows author, title, content
   - Displays prediction badge
   - Like and comment actions
   - Share functionality
   - Embedded comment section (non-compact mode)

2. **PostFeed** - Post list container
   - Fetches and displays posts
   - Loading skeleton states
   - Error handling with retry
   - Empty state with CTA

3. **CreatePostForm** - Post creation
   - Title and content inputs
   - AI prediction integration
   - Form validation
   - Loading states
   - Success/error handling

4. **PostActions** - Post interaction UI
   - Comment count display
   - Links to comment section

#### Shared Components

- **PredictionBadge** (`components/prediction-badge.tsx`)
  - Visual indicator for Real/Fake news
  - Confidence percentage display
  - Color-coded (green for Real, red for Fake)
  - Progress bar visualization

### User Integration

#### Auth Store (`store/auth-store.ts`)
- Zustand-based state management
- Persisted authentication state
- User data and access token storage

#### User Context (`context/user-context.tsx`)
- React Context wrapper around auth store
- Provides `currentUser` and `isAuthenticated`
- Can be used alongside existing `useAuth` hook

#### Auth Hook (`hooks/useAuth.ts`)
- Simplified access to auth state
- Returns user, token, and authentication status

### Pages

#### Feed Page (`app/feed/page.tsx`)
- Main feed view
- Header with title and "New post" button
- PostFeed component integration
- Responsive layout (max-width container)

#### Create Page (`app/create/page.tsx`)
- Post creation interface
- CreatePostForm component
- Instructional header

#### Post Detail Page (`app/post/[id]/page.tsx`)
- Full post view
- Author and timestamp
- Prediction badge
- Like button
- Comment section
- Error and loading states

## Features

### Post Display
- Compact mode for feed (truncated content)
- Full mode for detail page
- Author attribution
- Timestamp formatting
- Prediction visualization

### Interactions
- Like posts (authenticated users only)
- Comment on posts
- Share posts (copy link)
- Navigate to post details

### AI Prediction
- Run prediction on content before posting
- Visual feedback during analysis
- Display confidence scores
- Color-coded badges

### Responsive Design
- Mobile: single column, full width
- Tablet/Desktop: centered, max-width container
- Tailwind responsive classes throughout
- Touch-friendly interactions

## UI/UX

### Design System
- shadcn/ui components
- Tailwind CSS styling
- Card-based layout
- Consistent spacing and typography
- Hover states and transitions
- Loading skeletons
- Error states with retry

### Accessibility
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus states
- Screen reader friendly

## Data Flow

1. **Loading Posts**
   - PostFeed calls `usePosts()` hook
   - Hook uses React Query to fetch from API
   - Data cached and automatically revalidated

2. **Creating Posts**
   - User fills form in CreatePostForm
   - Optional: Run AI prediction
   - Submit triggers mutation
   - On success: invalidate queries, show toast, clear form

3. **Liking Posts**
   - User clicks like button
   - Check authentication
   - Mutation updates backend
   - Invalidate queries to refresh counts

4. **Comments**
   - Separate comment system (already implemented)
   - Integrated into PostCard
   - Real-time updates via React Query

## Error Handling

- Network errors: Show error state with retry
- Authentication errors: Redirect or show login prompt
- Validation errors: Inline form feedback
- Toast notifications for user actions

## Performance

- React Query caching
- Optimistic updates for likes/comments
- Lazy loading of images
- Efficient re-renders with proper memoization
- Skeleton loading states

## Security

- HTTP-only cookies for authentication
- CSRF protection via credentials
- Input sanitization
- XSS prevention

## File Structure

```
types/
  ├── user.ts
  ├── post.ts
  ├── prediction.ts
  └── comment.ts

lib/
  ├── api.ts
  └── api/
      ├── posts.ts
      ├── users.ts
      └── comments.ts

components/
  ├── posts/
  │   ├── post-card.tsx
  │   ├── post-feed.tsx
  │   ├── create-post-form.tsx
  │   ├── post-actions.tsx
  │   └── index.ts
  ├── comments/
  │   ├── comment-section.tsx
  │   ├── comment-list.tsx
  │   ├── comment-form.tsx
  │   └── comment-item.tsx
  ├── prediction-badge.tsx
  ├── loading-skeleton.tsx
  └── error-state.tsx

context/
  └── user-context.tsx

hooks/
  ├── useAuth.ts
  └── usePosts.ts

store/
  └── auth-store.ts

app/
  ├── feed/
  │   └── page.tsx
  ├── create/
  │   └── page.tsx
  └── post/
      └── [id]/
          └── page.tsx
```

## Testing Recommendations

1. **Unit Tests**
   - Component rendering
   - Hook behavior
   - Utility functions

2. **Integration Tests**
   - API calls
   - Form submissions
   - User flows

3. **E2E Tests**
   - Complete user journeys
   - Authentication flows
   - Post creation and interaction

## Future Enhancements

- Infinite scroll for feed
- Post editing
- Post deletion (owner only)
- User profiles
- Search and filtering
- Sorting options
- Bookmarking posts
- Notifications
- Real-time updates via WebSocket

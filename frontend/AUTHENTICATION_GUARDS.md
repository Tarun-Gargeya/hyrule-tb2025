# Authentication Route Guards

## Overview
The authentication route guards protect sensitive pages from unauthorized access. When users try to access protected routes without being authenticated (no valid data in localStorage), they are automatically redirected to the authentication page.

## Implementation

### ProtectedRoute Component
- **File**: `src/components/ProtectedRoute.jsx`
- **Purpose**: Wrapper component that checks authentication before rendering protected content
- **Behavior**: 
  - Shows loading spinner while auth state is being determined
  - Redirects to `/auth` if user is not authenticated
  - Renders protected content if user is authenticated

### Protected Routes
The following routes are now protected:
- `/company-dashboard` - Company dashboard page
- `/user-dashboard` - User dashboard page  
- `/my-badges` - User badges page
- `/profile/:userId` - User profile pages (both private and public views)

### Authentication Flow

#### 1. Route Access Attempt
```
User tries to access /profile/123
↓
ProtectedRoute checks isAuthenticated()
↓
If not authenticated → Redirect to /auth
If authenticated → Render ProfileWrapper
```

#### 2. Authentication Check
```javascript
const isAuthenticated = () => {
  return !!user && !!userType && !!profile;
};
```

#### 3. Redirect Logic
- **Unauthenticated Access**: Redirect to `/auth` with current location in state
- **After Login**: Redirect back to originally requested page
- **Fallback**: Default dashboard based on user type

## Features

### 🔒 **Automatic Protection**
- No additional code needed in protected components
- Centralized authentication logic
- Consistent behavior across all protected routes

### 🎯 **Smart Redirects**
- Remembers where user was trying to go
- Returns to intended destination after login
- Shows redirect destination in auth form

### ⏳ **Loading States**
- Loading spinner while checking authentication
- Prevents flash of content before redirect
- Smooth user experience

### 📱 **User Feedback**
- Clear indication of redirect destination
- Visual feedback during authentication check
- Proper error handling

## Usage Examples

### Basic Protection
```jsx
// Any route can be protected by wrapping with ProtectedRoute
<Route 
  path="/protected-page" 
  element={
    <ProtectedRoute>
      <ProtectedPage />
    </ProtectedRoute>
  } 
/>
```

### Authentication States
```jsx
// User not authenticated
localStorage: {} (empty)
Access /profile/123 → Redirect to /auth

// User authenticated  
localStorage: { auth_user, auth_user_type, auth_profile }
Access /profile/123 → Render ProfileWrapper
```

## Code Structure

### App.jsx Routes
```jsx
<Routes>
  {/* Public routes */}
  <Route path="/" element={<Homesmt />} />
  <Route path="/landing" element={<Homesmt />} />
  <Route path="/auth" element={<Auth />} />
  
  {/* Protected routes */}
  <Route path="/user-dashboard" element={
    <ProtectedRoute><UserDashboard /></ProtectedRoute>
  } />
  <Route path="/profile/:userId" element={
    <ProtectedRoute><ProfileWrapper /></ProtectedRoute>
  } />
  {/* ... more protected routes */}
</Routes>
```

### ProtectedRoute Logic
```jsx
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;
  if (!isAuthenticated()) return <Navigate to="/auth" state={{ from: location }} />;
  return children;
}
```

### Auth Component Enhancement
```jsx
// Get intended destination
const from = location.state?.from?.pathname || null;

// Redirect after successful login
if (from) {
  navigate(from, { replace: true });
} else {
  navigate('/default-dashboard');
}
```

## Testing Scenarios

### Test Case 1: Direct URL Access
1. Clear localStorage
2. Navigate directly to `/profile/123`
3. **Expected**: Redirect to `/auth`
4. **Result**: ✅ Redirected with return URL saved

### Test Case 2: Post-Login Redirect  
1. Access `/profile/123` while unauthenticated
2. Complete login process
3. **Expected**: Return to `/profile/123`
4. **Result**: ✅ Redirected to intended destination

### Test Case 3: Normal Navigation
1. Login normally from landing page
2. Navigate to protected routes via navbar
3. **Expected**: Normal access without redirects
4. **Result**: ✅ Direct access to protected content

### Test Case 4: Session Persistence
1. Login and access protected routes
2. Refresh browser
3. **Expected**: Remain on protected route
4. **Result**: ✅ Auth restored from localStorage

## Security Considerations

### Client-Side Protection
- ⚠️ **Note**: This is client-side protection only
- Server-side validation still required for API calls
- Cannot prevent determined users from viewing page source

### Authentication Validation
- Checks for presence of user, userType, and profile data
- Validates localStorage auth tokens
- Supabase session verification as backup

### Best Practices
1. Always validate auth server-side
2. Use HTTPS in production
3. Implement proper session management
4. Regular security audits of auth flow

## Future Enhancements

### Potential Improvements
1. **Role-based Access**: Different permissions for different user types
2. **Session Timeout**: Automatic logout after inactivity
3. **Remember Me**: Persistent login across browser sessions
4. **Multi-factor Auth**: Additional security layers
5. **Audit Logging**: Track access attempts and patterns

### Performance Optimizations
1. **Route Preloading**: Preload protected routes for faster navigation
2. **Auth Caching**: Cache authentication state for better performance
3. **Lazy Loading**: Load auth components only when needed
# User Search Functionality

## Overview
The user search feature allows authenticated users to search for other users and companies by name. The search is integrated into the navbar and provides real-time results with navigation to user profiles.

## Features

### 🔍 Real-time Search
- **Debounced Input**: 300ms delay to prevent excessive API calls
- **Minimum Query Length**: 2 characters required to trigger search
- **Live Results**: Updates as you type

### 👥 Search Scope
- **Users**: Search by full name in the `users` table
- **Companies**: Search by company name in the `companies` table
- **Combined Results**: Shows both users and companies in one dropdown

### 🎯 Search Results
- **User Icons**: Different icons for users (👤) and companies (🏢)
- **Profile Links**: Click any result to navigate to their profile
- **Rich Information**: Shows name, email, and additional company details
- **Responsive Design**: Works on desktop and mobile devices

## Implementation Details

### Component Structure
```
UserSearch.jsx
├── Search Input with Icon
├── Loading Spinner
└── Results Dropdown
    ├── User Results
    ├── Company Results
    └── No Results Message
```

### Database Queries
```sql
-- Search Users
SELECT id, full_name, email_id 
FROM users 
WHERE full_name ILIKE '%search_term%' 
LIMIT 10

-- Search Companies  
SELECT id, c_name, email_id, domain 
FROM companies 
WHERE c_name ILIKE '%search_term%' 
LIMIT 10
```

### Navigation Integration
- **Location**: Integrated into the main navbar
- **Visibility**: Only shown for authenticated users
- **Responsive**: Hidden on small screens (lg:block)
- **Width**: Fixed 320px width (w-80)

## Usage

### For Users
1. **Login** to see the search bar in the navbar
2. **Type** at least 2 characters in the search field
3. **Wait** for results to appear (300ms delay)
4. **Click** on any result to visit their profile
5. **Click outside** to close the results dropdown

### Search Results Format
```
👤 John Doe
   john.doe@email.com

🏢 Tech Company Inc.
   contact@techcompany.com • techcompany.com • Company
```

## Technical Specifications

### Dependencies
- `react-icons/fa`: For search, user, and building icons
- `react-router-dom`: For navigation to profiles
- `supabase`: For database queries

### Performance Features
- **Debouncing**: Prevents excessive API calls
- **Result Limiting**: Maximum 10 results per category (20 total)
- **Click Outside**: Automatic dropdown closure
- **Loading States**: Visual feedback during search

### Accessibility
- **Keyboard Navigation**: Tab-friendly interface
- **Screen Readers**: Proper ARIA labels
- **Focus Management**: Clear focus indicators
- **Loading Indicators**: Visual feedback for search state

## Future Enhancements

### Potential Improvements
1. **Advanced Filters**: Filter by user type, location, etc.
2. **Search History**: Remember recent searches
3. **Keyboard Navigation**: Arrow keys for result selection
4. **Infinite Scroll**: Load more results on demand
5. **Search Analytics**: Track popular searches

### Mobile Optimization
- **Mobile Search Page**: Dedicated search page for small screens
- **Touch Optimization**: Larger touch targets
- **Swipe Gestures**: Mobile-friendly interactions

## Testing Checklist

- [ ] Search triggers after 2+ characters
- [ ] Results appear within 300ms
- [ ] Both users and companies show in results
- [ ] Clicking results navigates to correct profile
- [ ] Loading spinner appears during search
- [ ] Dropdown closes when clicking outside
- [ ] Search works for partial name matches
- [ ] No results message shows when appropriate
- [ ] Icons display correctly for users vs companies
- [ ] Responsive design works on different screen sizes
# Frontend File Structure

This document outlines the organized file structure for the BadgeHub frontend application.

## 📁 Directory Structure

```
src/
├── components/           # Reusable UI components
│   ├── layout/          # Layout components (Navbar, Footer, etc.)
│   │   └── Navbar.jsx
│   ├── ui/              # UI components (Cards, Buttons, etc.)
│   │   ├── BadgeCard.jsx
│   │   └── StatsCard.jsx
│   └── index.js         # Barrel exports for easy imports
├── data/                # Static data and mock data
│   └── badgeData.js     # Sample badge data
├── hooks/               # Custom React hooks
│   └── useBadgeManager.js # Badge management logic
├── pages/               # Page components (route components)
│   ├── CompanyDashboard.jsx
│   ├── Home.jsx
│   ├── MyBadges.jsx
│   └── UserDashboard.jsx
├── styles/              # CSS and styling files
│   ├── App.css
│   └── index.css
├── utils/               # Utility functions and helpers
│   └── badgeUtils.js    # Badge-related utility functions
├── assets/              # Static assets (images, icons, etc.)
│   └── react.svg
├── App.jsx              # Main app component
└── main.jsx             # App entry point
```

## 🧩 Component Structure

### Pages (`/pages`)
Route-level components that represent full pages:
- `UserDashboard.jsx` - User dashboard with incoming/accepted badges
- `MyBadges.jsx` - Detailed view of all user badges
- `CompanyDashboard.jsx` - Company admin dashboard
- `Home.jsx` - Landing page

### Layout Components (`/components/layout`)
Components that provide app-wide layout structure:
- `Navbar.jsx` - Navigation bar with routing and profile

### UI Components (`/components/ui`)
Reusable UI building blocks:
- `BadgeCard.jsx` - Individual badge display card
- `StatsCard.jsx` - Statistics display card

## 🔧 Utilities & Logic

### Hooks (`/hooks`)
Custom React hooks for state management:
- `useBadgeManager.js` - Manages badge state and actions

### Utils (`/utils`)
Pure functions and utilities:
- `badgeUtils.js` - Badge icons, colors, filtering, and formatting

### Data (`/data`)
Static data and mock data:
- `badgeData.js` - Sample badge data for development

## 📝 Import Patterns

Thanks to the barrel export in `/components/index.js`, you can import multiple items easily:

```javascript
// Instead of multiple imports
import BadgeCard from './components/ui/BadgeCard';
import Navbar from './components/layout/Navbar';
import { useBadgeManager } from './hooks/useBadgeManager';

// Use barrel imports
import { BadgeCard, Navbar, useBadgeManager } from './components';
```

## 🎯 Benefits of This Structure

1. **Separation of Concerns** - Each folder has a specific purpose
2. **Reusability** - Components are modular and reusable
3. **Maintainability** - Easy to find and modify specific functionality
4. **Scalability** - Structure supports growth of the application
5. **Developer Experience** - Consistent patterns and easy imports

## 🚀 Usage

Each component is designed to be:
- **Self-contained** - All dependencies clearly defined
- **Prop-driven** - Configurable through props
- **Accessible** - Following accessibility best practices
- **Responsive** - Works on all screen sizes
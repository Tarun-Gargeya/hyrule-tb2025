import React from 'react';

// Simple purple badge/award SVG logo
const OfferCredLogo = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="14" fill="url(#purple-gradient)" stroke="#7C3AED" strokeWidth="2" />
    <path d="M16 8L18.09 13.26L23.82 13.27L19.36 16.97L21.45 22.23L16 18.53L10.55 22.23L12.64 16.97L8.18 13.27L13.91 13.26L16 8Z" fill="#fff" stroke="#A78BFA" strokeWidth="1.2" />
    <defs>
      <linearGradient id="purple-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A78BFA" />
        <stop offset="1" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
  </svg>
);

export default OfferCredLogo;

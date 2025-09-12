import React from "react";
import { getBadgeIcon, getCategoryColor } from "../../utils/badgeUtils";

export default function BadgeCard({ badge, onAccept, onReject, showActions = false }) {
  const IconComponent = getBadgeIcon(badge.category);

  return (
    <div className={`border border-gray-200 rounded-lg p-4 ${showActions ? 'hover:shadow-md' : 'bg-gradient-to-r from-green-50 to-blue-50'} transition-shadow`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            {badge.issuerAvatar && (
              <img src={badge.issuerAvatar} alt={badge.issuer || badge.organization} className="h-8 w-8 rounded-full" />
            )}
            <div>
              <h4 className="text-sm font-medium text-gray-900">{badge.title}</h4>
              <p className="text-xs text-gray-500">by {badge.organization || badge.issuer}</p>
            </div>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(badge.category)}`}>
              {badge.category}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
          
          {badge.skills && (
            <div className="mb-2">
              <div className="flex flex-wrap gap-2">
                {badge.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Category: {badge.category}</span>
            <span>Date: {badge.date || badge.dateAccepted}</span>
          </div>
        </div>
      </div>
      
      {showActions && (
        <div className="flex space-x-2 mt-4">
          <button
            onClick={() => onAccept(badge.id)}
            className="flex-1 bg-green-600 text-white px-3 py-2 text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
          >
            Accept
          </button>
          <button
            onClick={() => onReject(badge.id)}
            className="flex-1 bg-gray-300 text-gray-700 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-400 transition-colors"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}
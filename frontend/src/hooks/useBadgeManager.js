import { useState } from "react";
import { sampleIncomingBadges, sampleAcceptedBadges } from "../data/badgeData";

export const useBadgeManager = () => {
  const [incomingBadges, setIncomingBadges] = useState(sampleIncomingBadges);
  const [acceptedBadges, setAcceptedBadges] = useState(sampleAcceptedBadges);

  const handleAcceptBadge = (badgeId) => {
    const badge = incomingBadges.find(b => b.id === badgeId);
    if (badge) {
      // Add to accepted badges
      setAcceptedBadges(prev => [...prev, {
        ...badge,
        id: badge.id + 1000, // Ensure unique ID
        dateAccepted: new Date().toISOString().split('T')[0]
      }]);
      
      // Remove from incoming badges
      setIncomingBadges(prev => prev.filter(b => b.id !== badgeId));
    }
  };

  const handleRejectBadge = (badgeId) => {
    setIncomingBadges(prev => prev.filter(b => b.id !== badgeId));
  };

  return {
    incomingBadges,
    acceptedBadges,
    handleAcceptBadge,
    handleRejectBadge
  };
};
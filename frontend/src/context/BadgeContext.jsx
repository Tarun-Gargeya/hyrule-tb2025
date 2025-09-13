import React, { createContext, useContext, useMemo, useState, useCallback, useEffect } from "react";

const BadgeContext = createContext(null);

export const BadgeProvider = ({ children }) => {
  const [incomingBadges, setIncomingBadges] = useState([]);
  const [acceptedBadges, setAcceptedBadges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAcceptBadge = useCallback((badgeId) => {
    const badge = incomingBadges.find((b) => b.id === badgeId);
    if (badge) {
      setAcceptedBadges((prev) => [
        ...prev,
        {
          ...badge,
          id: badge.id + 1000,
          dateAccepted: new Date().toISOString().split("T")[0],
        },
      ]);
      setIncomingBadges((prev) => prev.filter((b) => b.id !== badgeId));
    }
  }, [incomingBadges]);

  const handleRejectBadge = useCallback((badgeId) => {
    setIncomingBadges((prev) => prev.filter((b) => b.id !== badgeId));
  }, []);

  // Placeholder: fetch existing badges for the user from backend
  const fetchExistingBadges = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Get user id from localStorage (or context if available)
      const user = JSON.parse(localStorage.getItem('auth_user'));
      const userId = user?.id;
      if (!userId) {
        setAcceptedBadges([]);
        setIncomingBadges([]);
        setLoading(false);
        return;
      }
      const res = await fetch(`http://localhost:3001/badges?user_id=${userId}`);
      if (!res.ok) throw new Error(`Failed to fetch badges: ${res.status}`);
      const data = await res.json();

      // Map backend shape (if different) to our UI shape. For now, treat all verified as accepted, others incoming.
      const verified = [];
      const pending = [];
      for (const b of data || []) {
        const common = {
          id: b.id ?? Math.random(),
          title: b.title || b.position || "Badge",
          description: b.description || `Issued by ${b.company ?? "Company"}`,
          issuer: b.issuer || b.company || "Company",
          organization: b.organization || b.company || null,
          category: b.category || "General",
        };
        if (b.status === "verified") {
          verified.push({ ...common, dateAccepted: b.verified_at?.slice(0, 10) || new Date().toISOString().slice(0,10) });
        } else {
          pending.push({ ...common, date: new Date().toISOString().slice(0,10) });
        }
      }

      // If user has no badges, add a default welcome badge
      if (verified.length === 0 && pending.length === 0) {
        verified.push({
          id: 'welcome-badge',
          title: 'Welcome to OfferCred',
          description: 'Thanks for joining OfferCred! Start earning verified badges.',
          issuer: 'OfferCred',
          organization: 'OfferCred',
          category: 'Welcome',
          dateAccepted: new Date().toISOString().slice(0,10),
        });
      }
      setAcceptedBadges(verified);
      setIncomingBadges(pending);
    } catch (e) {
      setError(e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-fetch once on provider mount to ensure frontend depends on backend placeholder
  useEffect(() => {
    fetchExistingBadges();
  }, [fetchExistingBadges]);

  const value = useMemo(() => ({
    incomingBadges,
    acceptedBadges,
    loading,
    error,
    handleAcceptBadge,
    handleRejectBadge,
    fetchExistingBadges,
  }), [incomingBadges, acceptedBadges, loading, error, handleAcceptBadge, handleRejectBadge, fetchExistingBadges]);

  return <BadgeContext.Provider value={value}>{children}</BadgeContext.Provider>;
};

export const useBadges = () => {
  const ctx = useContext(BadgeContext);
  if (!ctx) throw new Error("useBadges must be used within a BadgeProvider");
  return ctx;
};

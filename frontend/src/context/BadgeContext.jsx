import React, { createContext, useContext, useMemo, useState, useCallback, useEffect } from "react";

const BadgeContext = createContext(null);

export const BadgeProvider = ({ children }) => {
  const [incomingBadges, setIncomingBadges] = useState([]);
  const [acceptedBadges, setAcceptedBadges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState(null);

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
      // Placeholder endpoint; wire to backend when available
      const res = await fetch("http://localhost:3001/badges");
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
          verified.push({ ...common, dateAccepted: b.verifiedAt?.slice(0, 10) || new Date().toISOString().slice(0,10) });
        } else {
          pending.push({ ...common, date: new Date().toISOString().slice(0,10) });
        }
      }

      // Only update if we actually got data; otherwise keep samples.
      if (verified.length || pending.length) {
        setAcceptedBadges(verified);
        setIncomingBadges(pending);
      }
    } catch (e) {
      setError(e.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  // Auto-fetch once on provider mount to ensure frontend depends on backend placeholder
  useEffect(() => {
    fetchExistingBadges();
    (async () => {
      try {
        setProfileLoading(true);
        setProfileError(null);
        const res = await fetch("http://localhost:3001/profile");
        if (!res.ok) throw new Error(`Failed to fetch profile: ${res.status}`);
        const data = await res.json();
        setProfile(data);
      } catch (e) {
        setProfileError(e.message || "Unknown error");
      } finally {
        setProfileLoading(false);
      }
    })();
  }, [fetchExistingBadges]);

  const value = useMemo(() => ({
    incomingBadges,
    acceptedBadges,
    loading,
    error,
    profile,
    profileLoading,
    profileError,
    handleAcceptBadge,
    handleRejectBadge,
    fetchExistingBadges,
    fetchProfile: async () => {
      try {
        setProfileLoading(true);
        setProfileError(null);
        const res = await fetch("http://localhost:3001/profile");
        if (!res.ok) throw new Error(`Failed to fetch profile: ${res.status}`);
        const data = await res.json();
        setProfile(data);
      } catch (e) {
        setProfileError(e.message || "Unknown error");
      } finally {
        setProfileLoading(false);
      }
    },
  }), [incomingBadges, acceptedBadges, loading, error, profile, profileLoading, profileError, handleAcceptBadge, handleRejectBadge, fetchExistingBadges]);

  return <BadgeContext.Provider value={value}>{children}</BadgeContext.Provider>;
};

export const useBadges = () => {
  const ctx = useContext(BadgeContext);
  if (!ctx) throw new Error("useBadges must be used within a BadgeProvider");
  return ctx;
};

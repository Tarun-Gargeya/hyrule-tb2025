// Sample badge data for development and testing

export const sampleIncomingBadges = [
  {
    id: 1,
    title: "JavaScript Expert",
    description: "Demonstrated advanced JavaScript skills",
    issuer: "Tech Corp",
    dateIssued: "2023-09-01",
    criteria: "Complete advanced JavaScript projects",
    imageUrl: "/badge-js.png",
    status: "pending"
  },
  {
    id: 2,
    title: "React Developer",
    description: "Built complex React applications",
    issuer: "Web Solutions Inc",
    dateIssued: "2023-09-05",
    criteria: "Create production-ready React apps",
    imageUrl: "/badge-react.png",
    status: "pending"
  },
  {
    id: 3,
    title: "Team Leadership",
    description: "Successfully led development team",
    issuer: "Innovation Labs",
    dateIssued: "2023-09-10",
    criteria: "Lead team projects to completion",
    imageUrl: "/badge-leadership.png",
    status: "pending"
  }
];

export const sampleAcceptedBadges = [
  {
    id: 1001,
    title: "HTML/CSS Master",
    description: "Excellent front-end development skills",
    issuer: "Design Studio",
    dateIssued: "2023-08-15",
    dateAccepted: "2023-08-16",
    criteria: "Create responsive web designs",
    imageUrl: "/badge-html.png",
    status: "accepted"
  },
  {
    id: 1002,
    title: "Problem Solver",
    description: "Outstanding analytical and debugging skills",
    issuer: "Code Academy",
    dateIssued: "2023-08-20",
    dateAccepted: "2023-08-21",
    criteria: "Solve complex programming challenges",
    imageUrl: "/badge-problem.png",
    status: "accepted"
  }
];

export const sampleCompanyBadges = [
  {
    id: 2001,
    title: "Innovation Award",
    description: "Most innovative solution of the year",
    department: "Engineering",
    dateIssued: "2023-09-01",
    criteria: "Develop breakthrough technology",
    imageUrl: "/badge-innovation.png",
    recipients: ["John Doe", "Jane Smith"],
    status: "active"
  },
  {
    id: 2002,
    title: "Quality Excellence",
    description: "Exceptional quality standards maintained",
    department: "QA",
    dateIssued: "2023-08-25",
    criteria: "Zero defect delivery",
    imageUrl: "/badge-quality.png",
    recipients: ["Mike Johnson"],
    status: "active"
  }
];

// Mock API functions for development
export const mockBadgeAPI = {
  getUserBadges: async (userId) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      incoming: sampleIncomingBadges,
      accepted: sampleAcceptedBadges
    };
  },
  
  getCompanyBadges: async (companyId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return sampleCompanyBadges;
  },
  
  acceptBadge: async (badgeId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true, badgeId };
  },
  
  rejectBadge: async (badgeId) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return { success: true, badgeId };
  }
};
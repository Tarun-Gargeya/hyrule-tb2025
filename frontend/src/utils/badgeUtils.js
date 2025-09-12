import { 
  FaBook, 
  FaBolt, 
  FaCrown, 
  FaBullseye, 
  FaLightbulb, 
  FaHandshake,
  FaTrophy
} from "react-icons/fa";

// Get badge icon based on category
export const getBadgeIcon = (category) => {
  const icons = {
    "Learning": FaBook,
    "Technical Excellence": FaBolt,
    "Leadership": FaCrown,
    "Customer Service": FaBullseye,
    "Innovation": FaLightbulb,
    "Collaboration": FaHandshake
  };
  return icons[category] || FaTrophy;
};

// Get category-specific colors
export const getCategoryColor = (category) => {
  const colors = {
    "Learning": "bg-blue-100 text-blue-800",
    "Technical Excellence": "bg-purple-100 text-purple-800",
    "Leadership": "bg-yellow-100 text-yellow-800",
    "Customer Service": "bg-green-100 text-green-800",
    "Innovation": "bg-pink-100 text-pink-800",
    "Collaboration": "bg-indigo-100 text-indigo-800"
  };
  return colors[category] || "bg-gray-100 text-gray-800";
};

// Filter badges based on search term and category
export const filterBadges = (badges, searchTerm, selectedCategory) => {
  return badges.filter(badge => {
    const matchesSearch = badge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         badge.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (badge.skills && badge.skills.some(skill => 
                           skill.toLowerCase().includes(searchTerm.toLowerCase())
                         ));
    const matchesCategory = selectedCategory === "All" || badge.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
};

// Format date to readable string
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};
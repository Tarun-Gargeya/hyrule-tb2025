export const fetchUsers = async () => {
  const res = await fetch('/api/users'); // Vite proxy will forward
  return res.json();
};

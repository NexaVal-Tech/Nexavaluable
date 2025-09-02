// lib/auth.js
export const getAuthToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
};

export const getAuthUser = () => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('adminUser') || sessionStorage.getItem('adminUser');
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
  sessionStorage.removeItem('adminToken');
  sessionStorage.removeItem('adminUser');
};

export const isAuthenticated = () => {
  const token = getAuthToken();
  return !!token;
};
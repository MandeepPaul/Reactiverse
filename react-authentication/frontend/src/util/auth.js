export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export function tokenLoader() {
  const token = getAuthToken();

  if (token) return token;

  return null;
}

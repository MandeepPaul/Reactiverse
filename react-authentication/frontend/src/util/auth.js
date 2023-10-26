import { redirect } from "react-router-dom";

const storedExpirationDate = () => {
  const storedExpiry = localStorage.getItem("expirationDate");
  const expiryDate = new Date(storedExpiry);
  const now = new Date();

  return expiryDate.getTime() - now.getTime();
};

export const getAuthToken = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  const tokenDuration = storedExpirationDate();

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
};

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) return redirect("/auth");

  return null;
}

import { jwtDecode } from "jwt-decode";

export const isTokenValid = () => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const now = Date.now();
    return decoded.exp * 1000 > now; // Check if the token is expired
  } catch (error) {
    console.error("Token decoding error:", error); // Log the error for debugging
    return false; // If the token can't be decoded, it's invalid
  }
};

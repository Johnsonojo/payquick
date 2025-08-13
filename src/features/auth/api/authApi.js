import baseAxios from "../../../shared/api/baseAxios";
import { API_ENDPOINTS } from "../../../shared/constants/api";

const login = async (credentials) => {
  const { username, password } = credentials;

  // Get all users from mock API
  const response = await baseAxios.get(API_ENDPOINTS.USERS);
  const users = response.data;

  // Find user with matching username and password
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    throw new Error("Invalid username or password");
  }

  // Mock token generation
  const token = `mock-token-${user.id}-${Date.now()}`;

  return {
    user: {
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
    },
    token,
  };
};

const logout = async () => {
  // In a real app, this would call the backend to invalidate the token
  // For now, just return success
  return { success: true };
};

export { login, logout };

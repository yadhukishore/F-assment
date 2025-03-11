import useSWRMutation from "swr/mutation";
import { axiosInstance } from "./fetcher";
import useSWR from "swr";

const loginFetcher = async (url, { arg }) => {
  const { username, password } = arg;
  const response = await axiosInstance.post(url, {
    username,
    password,
    expiresInMins: 30
  });

  const userData = response.data;

  // Set Authorization header for future requests
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${userData.accessToken}`;

  // Store tokens in localStorage for persistence
  localStorage.setItem("accessToken", userData.accessToken);
  localStorage.setItem("refreshToken", userData.refreshToken);
  
  // Store user data in localStorage
  localStorage.setItem("userData", JSON.stringify(userData));

  return userData;
};

export const useLogin = () => {
  return useSWRMutation("/auth/login", loginFetcher);
};

export const logout = () => {
  // Clear tokens and user data from localStorage
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userData');
  
  // Remove authorization header
  delete axiosInstance.defaults.headers.common['Authorization'];
};

// Function to get current user info
export const getCurrentUser = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

// Hook to fetch current user data if not available
export const useCurrentUser = () => {
  return useSWR('/auth/me', async (url) => {
    // First check localStorage
    const cachedUser = getCurrentUser();
    if (cachedUser) return cachedUser;
    
    // If we have a token but no cached user, fetch from API
    if (localStorage.getItem('accessToken')) {
      const response = await axiosInstance.get(url);
      const userData = response.data;
      localStorage.setItem("userData", JSON.stringify(userData));
      return userData;
    }
    
    return null;
  }, { 
    revalidateOnFocus: false, 
    shouldRetryOnError: false 
  });
};
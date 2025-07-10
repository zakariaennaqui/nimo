// src/context/AuthContext.tsx
import { createContext, useEffect, useContext, ReactNode, useState } from 'react';
import axios, { AxiosError, AxiosProgressEvent } from 'axios';

// Define types
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profileImage: string;
  phone:string
}
interface VerificationResponse{
  success:boolean;
  message:string ;
  verified ?: boolean ;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'renter';
  isVerified:boolean;
}

interface UpdateUserData {
  name?: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (userData: RegisterData) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateUser: (userData: UpdateUserData) => Promise<{ success: boolean; message?: string; user?: User }>;
  updateProfileImage: (file: File, onUploadProgress?: (progressEvent: AxiosProgressEvent) => void) => Promise<{ success: boolean; message?: string; user?: User }>;
  deleteAccount: () => Promise<{ success: boolean; message?: string }>;
  getMe: () => Promise<{ success: boolean; message?: string; user?: User }>;
  
  //Methods for email verification
  sendVerificationCode:(email:string)=>Promise<{success:boolean; message:string}>;
  verifyEmail:(email:string , code: string)=>Promise<VerificationResponse>;
  resendVerificationCode:(email:string)=>Promise<{success:boolean; message:string}>;

}

interface AuthProviderProps {
  children: ReactNode;
}

// Create the context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Set up axios default baseURL and interceptors
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  // Parse user from localStorage if available
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    }
    setLoading(false);
  }, []);

  // Store token and user in localStorage whenever they change
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
    
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setIsAuthenticated(true);
    }
  }, [token, user]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post<{ token: string; user: User }>(
        '/api/auth/login',
        { email, password }
      );

      if (response.data.token && response.data.user) {
        setToken(response.data.token);
        setUser(response.data.user);
        setIsAuthenticated(true);
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        return { success: true };
      }
      
      return { 
        success: false, 
        message: 'Login failed: Invalid response from server' 
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      return {
        success: false,
        message: axiosError.response?.data?.message || 'Login failed'
      };
    }
  };

  // Verification email functions 
  const sendVerificationCode = async (email: string) => {
    try {
      const response = await axios.post('/api/auth/send-verification', { email });
      return response.data;
    } catch (error) {
      console.error('Error sending verification code:', error);
      
      // Handle Axios error responses
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data || { success: false, message: 'Failed to send verification code' };
      }
      
      return { success: false, message: 'Failed to send verification code' };
    }
  };

  // verify Email function 
  const verifyEmail = async (email: string, code: string) => {
    try {
      const response = await axios.post('/api/auth/verify-email', { email, code });
      return response.data;
    } catch (error) {
      console.error('Error verifying email:', error);
      
      // Handle Axios error responses
      if (axios.isAxiosError(error) && error.response) {
        return error.response.data || { success: false, message: 'Failed to verify email' };
      }
      
      return { success: false, message: 'Failed to verify email' };
    }
  };


  const register = async (userData: RegisterData) => {
    try {
      const response = await axios.post(
        '/api/auth/register',
        userData
      );

      return { success: true, message: response.data.message };
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      return {
        success: false,
        message: axiosError.response?.data?.message || 'Registration failed'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const getMe = async () => {
    try {
      const response = await axios.get<{ user: User }>('/api/auth/me');
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return { success: true, user: response.data.user };
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      return {
        success: false,
        message: axiosError.response?.data?.message || 'Failed to fetch user data'
      };
    }
  };

  const updateUser = async (userData: UpdateUserData) => {
    try {
      const response = await axios.put<{ user: User }>(
        '/api/auth/update',
        userData
      );

      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      return { 
        success: true, 
        user: response.data.user,
        message: 'Profile updated successfully' 
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      return {
        success: false,
        message: axiosError.response?.data?.message || 'Failed to update profile'
      };
    }
  };

  const updateProfileImage = async (file: File, onUploadProgress?: (progressEvent: AxiosProgressEvent) => void) => {
    try {
      const formData = new FormData();
      formData.append('profileImage', file);

      const response = await axios.put<{ user: User }>(
        '/api/auth/update-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress
        }
      );

      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      return { 
        success: true, 
        user: response.data.user,
        message: 'Profile image updated successfully' 
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message?: string }>;
      return {
        success: false,
        message: axiosError.response?.data?.message || 'Failed to update profile image'
      };
    }
  };

// src/context/AuthContext.tsx

const deleteAccount = async () => {
  try {
    const response = await axios.delete('/api/auth/delete');
    
    if (response.data.success) {
      logout(); // Clear user data after deletion
      return { 
        success: true, 
        message: response.data.message || 'Account and all associated cars deleted successfully' 
      };
    } else {
      return {
        success: false,
        message: response.data.message || 'Failed to delete account'
      };
    }
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return {
      success: false,
      message: axiosError.response?.data?.message || 'Failed to delete account'
    };
  }
};

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      loading, 
      login, 
      register, 
      logout,
      updateUser,
      updateProfileImage,
      deleteAccount,
      getMe,
      sendVerificationCode,
      verifyEmail,
      resendVerificationCode: sendVerificationCode,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  age: string;
  sex: string;
  role: string;
  subscription: 'free' | 'basic' | 'pro' | 'enterprise';
  messagesUsed: number;
  messagesLimit: number;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  verifyOTP: (otp: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  updateSubscription: (plan: 'basic' | 'pro' | 'enterprise') => void;
  incrementMessageCount: () => boolean;
  pendingUser: RegisterData | null;
}

interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  password: string;
  age: string;
  sex: string;
  role: string;
  tnc_agreement: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingUser, setPendingUser] = useState<RegisterData | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dummy login - in real app, this would be Firebase/API call
      if (email && password) {
        const userData: User = {
          id: '1',
          first_name: 'John',
          last_name: 'Doe',
          email,
          phone_number: '+91-9876543210',
          age: '30',
          sex: 'M',
          role: 'both',
          subscription: 'free',
          messagesUsed: 0,
          messagesLimit: 5
        };
        
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store pending user data for OTP verification
      setPendingUser(userData);
      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };

  const verifyOTP = async (otp: string): Promise<boolean> => {
    try {
      // Mock OTP verification (correct OTP is 123456)
      if (otp === '123456' && pendingUser) {
        const newUser: User = {
          id: Date.now().toString(),
          first_name: pendingUser.first_name,
          last_name: pendingUser.last_name,
          email: pendingUser.email,
          phone_number: pendingUser.phone_number,
          age: pendingUser.age,
          sex: pendingUser.sex,
          role: pendingUser.role,
          subscription: 'free',
          messagesUsed: 0,
          messagesLimit: 5
        };
        
        await AsyncStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
        setPendingUser(null);
        return true;
      }
      return false;
    } catch (error) {
      console.error('OTP verification error:', error);
      return false;
    }
  };

  const updateSubscription = (plan: 'basic' | 'pro' | 'enterprise') => {
    if (user) {
      const limits = {
        basic: 50,
        pro: -1, // unlimited
        enterprise: -1 // unlimited
      };
      
      const updatedUser = {
        ...user,
        subscription: plan,
        messagesLimit: limits[plan],
        messagesUsed: 0
      };
      
      setUser(updatedUser);
      AsyncStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const incrementMessageCount = (): boolean => {
    if (user) {
      if (user.subscription === 'free' && user.messagesUsed >= user.messagesLimit) {
        return false; // Limit reached
      }
      
      if (user.messagesLimit !== -1) { // Not unlimited
        const updatedUser = {
          ...user,
          messagesUsed: user.messagesUsed + 1
        };
        
        setUser(updatedUser);
        AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      }
      return true;
    }
    return false;
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
      setPendingUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        login, 
        register, 
        verifyOTP,
        logout, 
        isAuthenticated: !!user,
        updateSubscription,
        incrementMessageCount,
        pendingUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
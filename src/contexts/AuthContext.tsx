import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  role: 'owner' | 'driver' | 'admin';
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loginAs: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users
const DEMO_USERS: User[] = [
  {
    id: '1',
    email: 'owner@demo.com',
    role: 'owner',
    name: 'Rajesh Kumar'
  },
  {
    id: '2',
    email: 'driver1@demo.com',
    role: 'driver',
    name: 'Suresh Singh'
  },
  {
    id: '3',
    email: 'driver2@demo.com',
    role: 'driver',
    name: 'Ramesh Sharma'
  },
  {
    id: '4',
    email: 'admin@test.com',
    role: 'admin',
    name: 'Super Admin'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Demo authentication
    if ((email === 'owner@demo.com' && password === 'owner123') ||
        (email === 'driver1@demo.com' && password === 'driver123') ||
        (email === 'driver2@demo.com' && password === 'driver123') ||
        (email === 'admin@test.com' && password === 'Admin@123')) {
      
      const foundUser = DEMO_USERS.find(u => u.email === email);
      if (foundUser) {
        setUser(foundUser);
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const loginAs = (targetUser: User) => {
    setUser(targetUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loginAs }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
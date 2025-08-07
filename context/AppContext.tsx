import React, { createContext, useContext, useState } from 'react';

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  city: string;
  bhk: number;
  type: 'Buy' | 'Rent';
  category: string;
  area: number;
  images: string[];
  amenities: string[];
  verified: boolean;
  trending: boolean;
  agent: {
    name: string;
    phone: string;
    email: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface Filters {
  type: 'Buy' | 'Rent';
  city: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  bhk: number;
}

interface AppContextType {
  favorites: string[];
  toggleFavorite: (propertyId: string) => void;
  filters: Filters;
  updateFilters: (newFilters: Partial<Filters>) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({
    type: 'Buy',
    city: '',
    category: '',
    minPrice: 0,
    maxPrice: 100000000,
    bhk: 0
  });

  const toggleFavorite = (propertyId: string) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <AppContext.Provider value={{
      favorites,
      toggleFavorite,
      filters,
      updateFilters,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </AppContext.Provider>
  );
};
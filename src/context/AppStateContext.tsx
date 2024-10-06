// src/context/AppStateContext.tsx (Renaming SearchContext to AppStateContext for clarity)
import React, { createContext, useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Task } from '../types';

// Define the type for the context
interface AppStateContextType {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterStatus: 'All' | 'Pending' | 'In-Progress' | 'Completed';
  setFilterStatus: (status: 'All' | 'Pending' | 'In-Progress' | 'Completed') => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
}

// Create the context
const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

// Create a provider component
export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [searchQuery, setSearchQuery] = useState<string>(''); // Use useState instead of useLocalStorage
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'In-Progress' | 'Completed'>('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  return (
    <AppStateContext.Provider
      value={{
        tasks,
        setTasks,
        searchQuery,
        setSearchQuery,
        filterStatus,
        setFilterStatus,
        sortOrder,
        setSortOrder,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

// Custom hook to use the app state context
export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};

import React, { createContext, useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { Task } from '../types';

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

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
	const [searchQuery, setSearchQuery] = useState<string>('');
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

export const useAppState = () => {
	const context = useContext(AppStateContext);
	if (!context) {
		throw new Error('useAppState must be used within an AppStateProvider');
	}
	return context;
};

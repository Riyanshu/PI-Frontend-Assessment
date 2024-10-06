import React, { useMemo, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import ConfirmModal from './components/ConfirmModal';
import './styles/App.scss';
import { Task } from './types';
import Header from './components/Header';
import { useAppState } from './context/AppStateContext';

const App: React.FC = () => {
	const [editingTask, setEditingTask] = useState<Task | null>(null);
	const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { tasks, setTasks, searchQuery, filterStatus} = useAppState();

	const addTask = (task: Task) => {
		setTasks([...tasks, task]);
	};

	const updateTask = (updatedTask: Task) => {
		setTasks(
			tasks.map((task) =>
				task.id === updatedTask.id ? updatedTask : task
			)
		);
	};

	const deleteTask = (id: string) => {
		setTasks(tasks.filter((task) => task.id !== id));
	};

	const confirmDeleteTask = (task: Task) => {
		setTaskToDelete(task);
		setIsConfirmModalOpen(true);
	};

	const handleConfirmDelete = () => {
		if (taskToDelete) {
			deleteTask(taskToDelete.id);
			setTaskToDelete(null);
		}
		setIsConfirmModalOpen(false);
	};

	const handleCancelDelete = () => {
		setTaskToDelete(null);
		setIsConfirmModalOpen(false);
	};

	const onDragEnd = (result: DropResult) => {
		const { source, destination } = result;

		if (!destination) return;

		if (source.index === destination.index) return;

		const reorderedTasks = Array.from(tasks);
		const [movedTask] = reorderedTasks.splice(source.index, 1);
		reorderedTasks.splice(destination.index, 0, movedTask);

		setTasks([...reorderedTasks]);
	};

	const filteredTasks = useMemo(() => {
		return tasks
			.filter(task => {
				const matchesSearchQuery = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
											task.description?.toLowerCase().includes(searchQuery.toLowerCase());
				const matchesStatus = filterStatus === 'All' || task.status === filterStatus;
				return matchesSearchQuery && matchesStatus;
			})
	}, [filterStatus, searchQuery, tasks])

	return (
		<div className="app">
			<Header setIsModalOpen={setIsModalOpen} />

			<DragDropContext onDragEnd={onDragEnd}>
				<TaskList
				tasks={filteredTasks} 
				setEditingTask={setEditingTask} 
				deleteTask={confirmDeleteTask} 
				setIsModalOpen={setIsModalOpen}
				/>
			</DragDropContext>

			<TaskForm
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				addTask={addTask}
				editingTask={editingTask}
				updateTask={updateTask}
				setEditingTask={setEditingTask}
			/>

			<ConfirmModal
				isOpen={isConfirmModalOpen}
				message={`Are you sure you want to delete the task "${taskToDelete?.title}"?`}
				onConfirm={handleConfirmDelete}
				onCancel={handleCancelDelete}
			/>
		</div>
	);
};

export default App;
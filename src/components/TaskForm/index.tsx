import React, { useState, useEffect } from 'react';
import { Task, TaskStatus } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import './TaskForm.scss'; // Import your styles

interface TaskFormProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  addTask: (task: Task) => void;
  editingTask: Task | null;
  updateTask: (task: Task) => void;
  setEditingTask: (task: Task | null) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  isModalOpen,
  setIsModalOpen,
  addTask,
  editingTask,
  updateTask,
  setEditingTask,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('Pending');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
      setStatus(editingTask.status);
      setDueDate(editingTask.dueDate);
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dueDate) return;

    const newTask = editingTask
      ? { ...editingTask, title, description, status, dueDate }
      : { id: uuidv4(), title, description, status, dueDate };

    editingTask ? updateTask(newTask) : addTask(newTask);

    clearForm();
    setIsModalOpen(false);
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setStatus('Pending');
    setDueDate('');
    setEditingTask(null);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    clearForm();
  }

  const handleCloseModal = (e: React.MouseEvent) => {
    // Check if the click is outside the modal-content
    if ((e.target as HTMLElement).classList.contains('modal')) {
      handleClose();
    }
  };

  return isModalOpen ? (
    <div className="modal" onClick={handleCloseModal}>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task Title"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task Description (optional)"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
          >
            <option value="Pending">Pending</option>
            <option value="In-Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
          <button type="submit">
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>
        </form>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  ) : null;
};

export default TaskForm;

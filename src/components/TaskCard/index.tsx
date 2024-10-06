// src/components/TaskCard.tsx
import React from 'react';
import { Task } from '../../types';
import './TaskCard.scss'; // Import the SCSS file

interface TaskCardProps {
  task: Task;
  setEditingTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  setEditingTask,
  deleteTask,
  setIsModalOpen,
}) => {
  const handleEdit = () => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    deleteTask(task);
  };

  return (
    <div className="task-card">
      <div className="card-content">
        {/* Title and Status */}
        <div className="title">
          <div className="title-status">
            <h3>{task.title}</h3>
            <span className={`status ${task.status.toLowerCase()}`}>
              {task.status}
            </span>
          </div>

          {/* Description */}
          <p>{task.description}</p>
        </div>

        {/* Due Date */}
        <span className="due-date">Due: {task.dueDate}</span>
      </div>

      {/* Edit and Delete Buttons */}
      <div className="actions">
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default TaskCard;

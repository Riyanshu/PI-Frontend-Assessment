// src/components/TaskList.tsx
import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from '../TaskCard';
import { Task } from '../../types';
import './TaskList.scss';

interface TaskListProps {
  tasks: Task[];
  setEditingTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
  setIsModalOpen: (isOpen: boolean) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  setEditingTask,
  deleteTask,
  setIsModalOpen,
}) => {
  return (
    <Droppable droppableId="task-list">
      {(provided) => (
        <div
          className="task-list"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps} // Make the whole card draggable
                  style={{
                    ...provided.draggableProps.style,
                    background: snapshot.isDragging ? '#e0e4e8' : '#fff',
                    boxShadow: snapshot.isDragging ? '0 4px 8px rgba(0,0,0,0.1)' : 'none',
                    userSelect: 'none', // Disable text selection during dragging
                  }}
                >
                  <TaskCard
                    task={task}
                    setEditingTask={setEditingTask}
                    deleteTask={deleteTask}
                    setIsModalOpen={setIsModalOpen}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TaskList;

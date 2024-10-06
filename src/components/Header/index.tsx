// src/components/Header.tsx
import { TaskStatus } from "../../types";
import { useAppState } from "../../context/AppStateContext";
import './Header.scss';

interface HeaderProps {
    setIsModalOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setIsModalOpen }) => {
    const { tasks, setTasks, searchQuery, setSearchQuery, filterStatus, setFilterStatus, sortOrder, setSortOrder } = useAppState();

    const sortTasks = (order: 'asc' | 'desc') => {
        const sortedTasks = [...tasks].sort((a, b) => {
          const dateA = new Date(a.dueDate).getTime();
          const dateB = new Date(b.dueDate).getTime();
          return order === 'asc' ? dateA - dateB : dateB - dateA;
        });
        setTasks(sortedTasks);
        setSortOrder(order);
    };

    return (
      <header className="header">
        <div className="title">
          <h1>Task Management Dashboard</h1>
          <button onClick={() => setIsModalOpen(true)}>Add New Task</button>
        </div>
        <div className="controls">
          <input 
            type="text" 
            placeholder="Search by title or description..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
          />

          <div className="controls_end">
          <div className="filter-sort">
            <label htmlFor="filterStatus">Filter by Status</label>
            <select id="filterStatus" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as TaskStatus | 'All')}>
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="In-Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="filter-sort">
            <label htmlFor="sortOrder">Sort by Due Date</label>
            <select id="sortOrder" value={sortOrder} onChange={(e) => sortTasks(e.target.value as 'asc' | 'desc')}>
              <option value="asc">Due Date: Ascending</option>
              <option value="desc">Due Date: Descending</option>
            </select>
          </div>
          </div>
        </div>
      </header>
    );
}

export default Header;

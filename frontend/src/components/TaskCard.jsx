import React from 'react';
import { Calendar, Edit, Trash2, User } from 'lucide-react';

const TaskCard = ({ task, onEdit, onDelete }) => {
  const formatDate = (date) => {
    if (!date) return 'No due date';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusBadgeClass = (status) => {
    const classes = {
      pending: 'badge-pending',
      'in-progress': 'badge-in-progress',
      completed: 'badge-completed',
    };
    return `badge ${classes[status] || 'badge-pending'}`;
  };

  const getPriorityBadgeClass = (priority) => {
    const classes = {
      low: 'badge-low',
      medium: 'badge-medium',
      high: 'badge-high',
    };
    return `badge ${classes[priority] || 'badge-medium'}`;
  };

  return (
    <div className="card group hover:border-primary-200 border-2 border-transparent">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
          {task.title}
        </h3>
        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(task)}
            className="p-2 hover:bg-primary-50 rounded-lg transition-colors"
            title="Edit task"
          >
            <Edit size={16} className="text-primary-600" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete task"
          >
            <Trash2 size={16} className="text-red-600" />
          </button>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {task.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className={getStatusBadgeClass(task.status)}>
          {task.status === 'in-progress' ? 'In Progress' : task.status}
        </span>
        <span className={getPriorityBadgeClass(task.priority)}>
          {task.priority}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-1">
          <Calendar size={14} />
          <span>{formatDate(task.dueDate)}</span>
        </div>
        {task.createdBy && (
          <div className="flex items-center space-x-1">
            <User size={14} />
            <span className="truncate max-w-[100px]">
              {task.createdBy.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
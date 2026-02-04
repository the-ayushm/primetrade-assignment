import React, { useState, useEffect } from 'react';
import { taskAPI } from '../services/api';
import Navbar from '../components/Navbar';
import TaskModal from '../components/TaskModal';
import TaskCard from '../components/TaskCard';
import { Plus, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getTasks();
      setTasks(response.data.data.tasks);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await taskAPI.getStats();
      setStats(response.data.data.stats);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const handleCreateTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await taskAPI.deleteTask(taskId);
      toast.success('Task deleted successfully');
      fetchTasks();
      fetchStats();
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTask(null);
    fetchTasks();
    fetchStats();
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const statsCards = [
    {
      title: 'Total Tasks',
      value: stats?.total || 0,
      icon: TrendingUp,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
    },
    {
      title: 'Pending',
      value: stats?.pending || 0,
      icon: Clock,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600',
    },
    {
      title: 'In Progress',
      value: stats?.inProgress || 0,
      icon: AlertCircle,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
    },
    {
      title: 'Completed',
      value: stats?.completed || 0,
      icon: CheckCircle,
      color: 'bg-green-500',
      textColor: 'text-green-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Task Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your tasks efficiently</p>
          </div>
          <button
            onClick={handleCreateTask}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>New Task</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="text-white" size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-md p-2 mb-6 inline-flex space-x-2">
          {['all', 'pending', 'in-progress', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors capitalize ${
                filter === status
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {status === 'in-progress' ? 'In Progress' : status}
            </button>
          ))}
        </div>

        {/* Tasks Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <AlertCircle size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No tasks found</h3>
            <p className="text-gray-500 mb-6">
              {filter === 'all'
                ? 'Create your first task to get started'
                : `No ${filter} tasks at the moment`}
            </p>
            {filter === 'all' && (
              <button onClick={handleCreateTask} className="btn-primary">
                Create Task
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>

      {/* Task Modal */}
      {isModalOpen && (
        <TaskModal
          task={editingTask}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default Dashboard;
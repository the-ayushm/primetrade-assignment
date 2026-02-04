import Task from '../models/Task.js';

/**
 * @desc    Create new task
 * @route   POST /api/v1/tasks
 * @access  Private
 */
export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    // Create task with current user as creator
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      createdBy: req.user._id
    });

    // Populate creator information
    await task.populate('createdBy', 'name email');

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: {
        task
      }
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating task',
      error: error.message
    });
  }
};

/**
 * @desc    Get all tasks
 * @route   GET /api/v1/tasks
 * @access  Private
 */
export const getTasks = async (req, res) => {
  try {
    const { status, priority, page = 1, limit = 10 } = req.query;

    // Build query
    let query = {};

    // Non-admin users can only see their own tasks
    if (req.user.role !== 'admin') {
      query.createdBy = req.user._id;
    }

    // Filter by status if provided
    if (status) {
      query.status = status;
    }

    // Filter by priority if provided
    if (priority) {
      query.priority = priority;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query with pagination
    const tasks = await Task.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const total = await Task.countDocuments(query);

    res.status(200).json({
      success: true,
      count: tasks.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: {
        tasks
      }
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching tasks',
      error: error.message
    });
  }
};

/**
 * @desc    Get single task by ID
 * @route   GET /api/v1/tasks/:id
 * @access  Private
 */
export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate(
      'createdBy',
      'name email'
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Check if user is authorized to view this task
    if (
      req.user.role !== 'admin' &&
      task.createdBy._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this task'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        task
      }
    });
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching task',
      error: error.message
    });
  }
};

/**
 * @desc    Update task
 * @route   PUT /api/v1/tasks/:id
 * @access  Private
 */
export const updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Check if user is authorized to update this task
    if (
      req.user.role !== 'admin' &&
      task.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this task'
      });
    }

    // Update task
    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('createdBy', 'name email');

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: {
        task
      }
    });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating task',
      error: error.message
    });
  }
};

/**
 * @desc    Delete task
 * @route   DELETE /api/v1/tasks/:id
 * @access  Private
 */
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    // Check if user is authorized to delete this task
    if (
      req.user.role !== 'admin' &&
      task.createdBy.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this task'
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: {}
    });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting task',
      error: error.message
    });
  }
};

/**
 * @desc    Get task statistics
 * @route   GET /api/v1/tasks/stats
 * @access  Private
 */
export const getTaskStats = async (req, res) => {
  try {
    let query = {};

    // Non-admin users can only see their own task stats
    if (req.user.role !== 'admin') {
      query.createdBy = req.user._id;
    }

    const stats = await Task.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          pending: {
            $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] }
          },
          inProgress: {
            $sum: { $cond: [{ $eq: ['$status', 'in-progress'] }, 1, 0] }
          },
          completed: {
            $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
          },
          high: {
            $sum: { $cond: [{ $eq: ['$priority', 'high'] }, 1, 0] }
          },
          medium: {
            $sum: { $cond: [{ $eq: ['$priority', 'medium'] }, 1, 0] }
          },
          low: {
            $sum: { $cond: [{ $eq: ['$priority', 'low'] }, 1, 0] }
          }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        stats: stats[0] || {
          total: 0,
          pending: 0,
          inProgress: 0,
          completed: 0,
          high: 0,
          medium: 0,
          low: 0
        }
      }
    });
  } catch (error) {
    console.error('Get task stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching task statistics',
      error: error.message
    });
  }
};
import mongoose from 'mongoose';

/**
 * Task Schema
 * Secondary entity for demonstrating CRUD operations
 */
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a task title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please provide a task description'],
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters']
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending'
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },
    dueDate: {
      type: Date,
      default: null
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

/**
 * Index for better query performance
 * Create compound index on createdBy and status for common queries
 */
taskSchema.index({ createdBy: 1, status: 1 });

/**
 * Virtual field to check if task is overdue
 */
taskSchema.virtual('isOverdue').get(function () {
  if (!this.dueDate || this.status === 'completed') {
    return false;
  }
  return new Date() > this.dueDate;
});

/**
 * Ensure virtuals are included in JSON output
 */
taskSchema.set('toJSON', { virtuals: true });
taskSchema.set('toObject', { virtuals: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;
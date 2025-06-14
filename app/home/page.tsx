'use client'
import React, { useCallback, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskBoard from "../components/TaskBoard";
interface Task {
    _id?: string;
    title: string;
    description: string;
    dueDate: string;
    status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
  }
const page = () => {
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | undefined>();
    const [error, setError] = useState<string>('');
    const [refreshTrigger, setRefreshTrigger] = useState(0);
  
    const refreshTasks = useCallback(async () => {
      try {
        const response = await fetch('/api/tasks');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch tasks');
        }
        const data = await response.json();
        setRefreshTrigger(prev => prev + 1);
        return data;
      } catch (error) {
        console.error('Error refreshing tasks:', error);
        setError(error instanceof Error ? error.message : 'Failed to refresh tasks');
      }
    }, []);
  
    const handleCreateTask = async (task: Task) => {
      try {
        setError('');
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(task),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to create task');
        }
  
        setShowForm(false);
        await refreshTasks();
      } catch (error) {
        console.error('Error creating task:', error);
        setError(error instanceof Error ? error.message : 'Failed to create task');
      }
    };
  
    const handleEditTask = async (task: Task) => {
      try {
        setError('');
        const response = await fetch(`/api/tasks/${task._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(task),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update task');
        }
  
        setEditingTask(undefined);
        await refreshTasks();
      } catch (error) {
        console.error('Error updating task:', error);
        setError(error instanceof Error ? error.message : 'Failed to update task');
      }
    };

  return <div className="min-h-screen bg-gray-50">
     <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Task Management</h1>
            <button
              onClick={() => setShowForm(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create New Task
            </button>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {(showForm || editingTask) && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-md w-full">
                <TaskForm
                  task={editingTask}
                  onSubmit={editingTask ? handleEditTask : handleCreateTask}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingTask(undefined);
                    setError('');
                  }}
                />
              </div>
            </div>
          )}

          <TaskBoard
            onEditTask={setEditingTask} 
            refreshTasks={refreshTasks} 
            key={refreshTrigger}
          />
        </div>
      </div>
  </div>;
};

export default page;

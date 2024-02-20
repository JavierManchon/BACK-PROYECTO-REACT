import Task from '../models/task.model.js';
import Game from '../models/game.model.js';

export const getTasks = async (req, res) => {
  const tasks = await Task.find({
      //Me da solo las tareas del videojuego asociado a traves del id
      game: req.params.id
  });
  res.json(tasks);
};

export const createTask = async (req, res) => {
    try {
      const { title, description } = req.body;
      const gameId = req.params.id; 
  
      const newTask = new Task({
        title,
        description,
        game: gameId,
      });
  
      const savedTask = await newTask.save();
  
      const game = await Game.findByIdAndUpdate(
        gameId,
        { $push: { tasks: newTask._id } },
        { new: true }
      );
  
      res.status(201).json({
        success: true,
        message: 'Task created successfully',
        task: newTask,
        game: game,
        taskId: savedTask._id
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };

export const getTask = async (req, res) => {
    try {
      const taskId = req.params.id;
  
      const task = await Task.findById(taskId);
  
      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Task not found',
        });
      }
  
      res.status(200).json({
        success: true,
        task: task,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };

  export const deleteTask = async (req, res) => {
    try {
      const taskId = req.params.id;
  
      const deletedTask = await Task.deleteOne({ _id: taskId });
  
      if (!deletedTask) {
        return res.status(404).json({
          success: false,
          message: 'Task not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Task deleted successfully',
        task: deletedTask,
      });
    } catch (error) {
      console.error(error);
      // Agrega esta línea para imprimir el mensaje de error específico en la consola del servidor
      console.error(error.message); 

      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };

  

export const updateTask = async (req, res) => {
    try {
      const taskId = req.params.id;
      const updateData = req.body; 
  
      const updatedTask = await Task.findByIdAndUpdate(taskId, updateData, { new: true });
  
      if (!updatedTask) {
        return res.status(404).json({
          success: false,
          message: 'Task not found',
        });
      }
  
      res.status(200).json({
        success: true,
        message: 'Task updated successfully',
        task: updatedTask,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Internal Server Error',
      });
    }
  };
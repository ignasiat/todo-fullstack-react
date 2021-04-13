const Todo = require('../models/todoModel');

function TodoController() {
  const getTodos = async (req, res) => {
    const todoArray = await Todo.find({});
    res.status(200);
    res.json(todoArray);
  };

  const addTodos = (req, res) => {
    const newTodo = new Todo({ ...req.body });

    newTodo.save();

    res.status(200);
    res.json(newTodo);
  };

  const getTodo = (req, res) => {
    const { idTodo } = req.params;
    Todo.findById(idTodo, (error, data) => {
      if (error) {
        res.status(500);
        res.send(`Error adding todos ${error}`);
      } else {
        res.status(200);
        res.json(data);
      }
    });
  };

  const updateTodo = (req, res) => {
    const { idTodo } = req.params;
    const { todo } = req.body;
    Todo.findByIdAndUpdate(idTodo, { todo }, { new: true }, (error, data) => {
      if (error) {
        res.status(500);
        res.send(`Error updating todos ${error}`);
      } else {
        res.status(200);
        res.json(data);
      }
    });
  };

  const deleteTodo = (req, res) => {
    const { idTodo } = req.params;
    Todo.findByIdAndDelete(idTodo, (error, data) => {
      if (error) {
        res.status(500);
        res.send(`Error deleting todos ${error}`);
      } else {
        res.status(200);
        res.json(data);
      }
    });
  };

  return {
    getTodos,
    addTodos,
    getTodo,
    updateTodo,
    deleteTodo
  };
}

module.exports = TodoController();

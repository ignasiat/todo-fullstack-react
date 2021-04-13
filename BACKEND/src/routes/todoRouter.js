const { Router } = require('express');
const {
  getTodos, addTodos, getTodo, updateTodo, deleteTodo
} = require('../controllers/todoController');

function TodoRouter() {
  const router = Router();

  router
    .route('/')
    .get(getTodos)
    .post(addTodos);

  router
    .route('/:idTodo')
    .get(getTodo)
    .put(updateTodo)
    .delete(deleteTodo);
  return router;
}

module.exports = TodoRouter();

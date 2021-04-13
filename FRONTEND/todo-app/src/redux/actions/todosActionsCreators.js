import axios from 'axios';
import todosActionTypes from './todosActionsType';

const url = '/api/todos';

export function loadTodoApi() {
  return async (dispatch) => {
    const { data } = await axios.get(url);
    dispatch({
      type: todosActionTypes.LOAD_TODOS_API,
      todos: data
    });
  };
}

export function deleteTodo(idTodo) {
  return async (dispatch) => {
    const { data } = await axios.delete(`${url}/${idTodo}`);
    dispatch({
      type: todosActionTypes.DELETE_TODO,
      todo: data
    });
  };
}

export function createTodo(todo) {
  if (todo._id) {
    return async (dispatch) => {
      const { data } = await axios.put(`${url}/${todo._id}`, { todo: todo.todo });
      dispatch({
        type: todosActionTypes.UPDATE_TODO,
        updatedTodo: data
      });
    };
  }
  return async (dispatch) => {
    console.log(todo);
    const { data } = await axios.post(url, todo);
    dispatch({
      type: todosActionTypes.ADD_TODO,
      newTodo: data
    });
  };
}

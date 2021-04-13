import todosActionsType from '../actions/todosActionsType';

export default function todosReducer(state = [], action) {
  switch (action.type) {
    case todosActionsType.LOAD_TODOS_API:
      return [...action.todos];
    case todosActionsType.ADD_TODO:
      return [...state, action.newTodo];
    case todosActionsType.DELETE_TODO:
      return [...state].filter((todo) => todo._id !== action.todo._id);
    case todosActionsType.UPDATE_TODO:
      return [...state].map((todo) => {
        if (todo._id === action.updatedTodo._id) {
          return action.updatedTodo;
        }
        return todo;
      });
    default:
      return [...state];
  }
}

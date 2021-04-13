import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { loadTodoApi, deleteTodo, createTodo } from './redux/actions/todosActionsCreators';
import './App.css';

function App({ todos, actions }) {
  const [todo, setTodo] = useState({ todo: '' });

  function handleChange(event) {
    setTodo({ ...todo, todo: event.target.value });
  }

  function createUpdate() {
    actions.createTodo(todo);
    setTodo({ todo: '' });
  }
  useEffect(() => {
    actions.loadTodoApi();
  }, []);

  return (
    <main>
      <h1>To do's</h1>
      <ul>
        {todos.length > 0 && todos.map((todo) => (
          <li key={todo._id}>
            {todo.todo}
            <button type="button" onClick={() => actions.deleteTodo(todo._id)}>X</button>
            <button type="button" onClick={() => setTodo(todo)}>Modify</button>
          </li>
        ))}
      </ul>
      <section>
        <h2>{(todo._id) ? 'Modify To do' : 'Add To do'}</h2>
        <input type="text" value={todo.todo} onChange={handleChange} />
        <button type="button" onClick={() => createUpdate()}>{(todo._id) ? 'Update' : 'Add'}</button>
      </section>
    </main>
  );
}

App.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    todo: PropTypes.string
  })).isRequired,
  actions: PropTypes.shape({
    loadTodoApi: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    createTodo: PropTypes.func.isRequired
  }).isRequired
};

function mapStateToProps({ todos }) {
  return {
    todos
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      loadTodoApi,
      deleteTodo,
      createTodo
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

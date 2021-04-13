const {
  getTodos,
  addTodos,
  getTodo,
  updateTodo,
  deleteTodo
} = require('./todoController');

const Todos = require('../models/todoModel');

jest.mock('../models/todoModel');

describe('Given a getTodos function', () => {
  describe('When is invoked', () => {
    describe('And Todos.find is fullfill', () => {
      test('Then a status method is invoked with 200', async () => {
        const req = null;
        const res = { json: jest.fn(), send: jest.fn(), status: jest.fn() };

        Todos.find = jest.fn().mockReturnValue([]);

        await getTodos(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
      });
    });
  });
});

describe('Given a addTodos function', () => {
  describe('When is invoked', () => {
    test('Then status should invoked with 200', () => {
      const req = { body: { todo: 'New Todo' } };
      const res = { json: jest.fn(), status: jest.fn() };

      Todos.save = jest.fn().mockImplementationOnce(() => Promise.resolve({}));

      addTodos(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
});

describe('Given a getTodo function', () => {
  let req;
  let res;
  beforeEach(() => {
    req = { params: { idTodo: 12 } };
    res = { status: jest.fn(), json: jest.fn(), send: jest.fn() };
  });
  describe('When findById returns no error', () => {
    test('Then res.json method should be invoked', () => {
      Todos.findById.mockImplementationOnce((idTodo, callback) => callback(false, {}));

      getTodo(req, res);

      expect(res.json).toHaveBeenCalled();
    });
  });
  describe('When findById returns error', () => {
    test('Then res.send should be invoked', () => {
      Todos.findById.mockImplementationOnce((idTodo, callback) => callback(true, {}));

      getTodo(req, res);

      expect(res.send).toHaveBeenCalled();
    });
  });
});

describe('Given an updateTodo function', () => {
  let req;
  let res;
  beforeEach(() => {
    req = { params: { idTodo: 12 }, body: { todo: 'Updated Todo' } };
    res = { status: jest.fn(), send: jest.fn(), json: jest.fn() };
  });
  describe('When findByIdAndUpdate not return an error', () => {
    test('Then res.json should be invoked', () => {
      Todos.findByIdAndUpdate
        .mockImplementationOnce((idTodo, todo, options, callback) => callback(false, {}));

      updateTodo(req, res);

      expect(res.json).toHaveBeenCalled();
    });
  });
  describe('When findByIdAndUpdate return an error', () => {
    test('Then res.send method should be invoked', () => {
      Todos.findByIdAndUpdate
        .mockImplementationOnce((idTodo, todo, options, callback) => callback(true, null));

      updateTodo(req, res);

      expect(res.send).toHaveBeenCalled();
    });
  });
});

describe('Given a deleteTodo function', () => {
  let req;
  let res;
  beforeEach(() => {
    req = { params: { idTodo: 11 } };
    res = { status: jest.fn(), send: jest.fn(), json: jest.fn() };
  });
  describe('When findByIdAndDelete not returns an error', () => {
    test('Then res.json method should be invoked', () => {
      Todos.findByIdAndDelete.mockImplementationOnce((idTodo, callback) => callback(false, {}));

      deleteTodo(req, res);

      expect(res.json).toHaveBeenCalled();
    });
  });
  describe('When findByIdAndDelete returns an error', () => {
    test('Then res.send method should be invoked', () => {
      Todos.findByIdAndDelete.mockImplementationOnce((idTodo, callback) => callback(true, {}));

      deleteTodo(req, res);

      expect(res.send).toHaveBeenCalled();
    });
  });
});

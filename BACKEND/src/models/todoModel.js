const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
  todo: String
});

module.exports = model('Todos', todoSchema);

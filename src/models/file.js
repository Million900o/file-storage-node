const { Schema, model } = require('mongoose');

const FileSchema = Schema({
  id: String,
  name: String,
  mimetype: String,
  path: String,
  date: String
});

module.exports = model('file', FileSchema);
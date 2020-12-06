const { Schema, model } = require('mongoose');

const FileSchema = Schema({
  // ID for retreiving
  id: String,
  // Name for name when saved
  name: String,
  // Mime-type to return with
  mimetype: String,
  // Path to file
  path: String,
  // Date stored
  date: String
});

module.exports = model('file', FileSchema);
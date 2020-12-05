// Will move to a real DB soon.
const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const DB_PATH = path.resolve(__dirname, 'db.json');

function readDB() {
  logger.debug('Read DB');
  return JSON.parse(fs.readFileSync(DB_PATH));
}

function writeDB(data) {
  logger.debug('Wrote DB');
  if (typeof data !== 'object') return logger.error('Data is not of type Object');
  fs.writeFileSync(DB_PATH, JSON.stringify(data));
}

module.exports.getFile = (id) => {
  if (typeof id !== 'string') id = id.toString();
  let json = readDB();
  let data = json[id];
  return data;
};

module.exports.saveFile = (id, data) => {
  if (typeof id !== 'string') id = id.toString();
  if (typeof data !== 'object') return logger.error('Data is not of type Object');
  let json = readDB();
  if (json[id] !== undefined) return logger.error('Overwriting data on DB is not supported yet');
  json[id] = data;
  logger.debug('Added', id, 'to DB');
  writeDB(json);
};

module.exports.deleteFile = (id) => {
  if (typeof id !== 'string') id = id.toString();
  let json = readDB();
  if (json[id] == undefined) return logger.error('File does not exist in DB');
  delete json[id];
  logger.debug('Deleted', '"' + id + '"', 'from DB');
  writeDB(json);
};
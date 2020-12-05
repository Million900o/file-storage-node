// Get config
const config = require('../../config.json');

// Fancy colors
const colors = require('colors');

// [LOG] args
module.exports.log = (message, ...args) => {
  let msg = `${'[LOG]'.green} ${message.toString().white} ${args.length > 0 ? args.join(' ').white : ''}`;
  console.log(msg);
};

// [WARN] args
module.exports.warn = (message, ...args) => {
  let msg = `${'[WARN]'.yellow} ${message.toString().white} ${args.length > 0 ? args.join(' ').white : ''}`;
  console.log(msg);
};

// [ERROR] args
module.exports.error = (message, ...args) => {
  let msg = `${'[ERROR]'.red} ${message.toString().white} ${args.length > 0 ? args.join(' ').white : ''}`;
  console.log(msg);
};

// [DEBUG] args
module.exports.debug = (message, ...args) => {
  if (!config.debug) return;
  let msg = `${'[DEBUG]'.magenta} ${message.toString().white} ${args.length > 0 ? args.join(' ').white : ''}`;
  console.log(msg);
};

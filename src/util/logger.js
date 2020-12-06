// Get config
const config = require('../../config.json');

// Fancy colors
const colors = require('colors');

// [LOG] args1 args2
module.exports.log = (message, ...args) => {
  let msg = `${'[LOG]'.green} ${message.toString().white} ${args.length > 0 ? args.join(' ').white : ''}`;
  console.log(msg);
};

// [WARN] args1 args2
module.exports.warn = (message, ...args) => {
  let msg = `${'[WARN]'.yellow} ${message.toString().white} ${args.length > 0 ? args.join(' ').white : ''}`;
  console.log(msg);
};

// [ERROR] args1 args2
module.exports.error = (message, ...args) => {
  let msg = `${'[ERROR]'.red} ${message.toString().white} ${args.length > 0 ? args.join(' ').white : ''}`;
  console.log(msg);
};

// [DEBUG] args1 args2 args3 (and so on)
module.exports.debug = (message, ...args) => {
  // Check if actually debuging, if not return
  if (!config.debug) return;
  let msg = `${'[DEBUG]'.magenta} ${message.toString().white} ${args.length > 0 ? args.join(' ').white : ''}`;
  console.log(msg);
};

// Get config
const config = require('../../config.json');

// Fancy colors
const colors = require('colors');

// [LOG] args1 args2
module.exports.log = (...args) => {
  if (args.length == 0) return;
  let msg = `${'[LOG]'.green} ${args.join(' ').white}`;
  console.log(msg);
  return;
};

// [WARN] args1 args2
module.exports.warn = (...args) => {
  if (args.length == 0) return;
  let msg = `${'[WARN]'.yellow} ${args.join(' ').white}`;
  console.log(msg);
  return;
};

// [ERROR] args1 args2
module.exports.error = (...args) => {
  if (args.length == 0) return;
  let msg = `${'[ERROR]'.red} ${args.join(' ').white}`;
  console.log(msg);
  return;
};

// [DEBUG] args1 args2 args3 (and so on)
module.exports.debug = (...args) => {
  // Check if actually debuging, if not return
  if (!config.debug || args.length == 0) return;
  let msg = `${'[DEBUG]'.magenta} ${args.join(' ').white}`;
  console.log(msg);
  return;
};

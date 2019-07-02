const minimist = require('minimist');
const error = require('./utils/error');

module.exports = () => {
  const args = minimist(process.argv.slice(2));
  const mathExpression = args._[1];

  let cmd = args._[0] || 'help';

  if (args.version || args.v) {
    cmd = 'version';
  }

  if (args.help || args.h) {
    cmd = 'help';
  }

  switch (cmd) {
    case 'evaluate':
      require('./cmds/evaluate')(mathExpression);
      break;

    case 'version':
      require('./cmds/version')(args);
      break;

    case 'help':
      require('./cmds/help')(args);
      break;

    default:
      error(`"${cmd}" is not a valid command!`, true);
      break;
  }
};
const ora = require('ora');
const { evaluate } = require('../utils/evaluate');

module.exports = (args) => {
  const spinner = ora('Crunching the numbers...📝').start();
  
  return new Promise(resolve => {
    setTimeout(() => {
      spinner.color = 'yellow';
	    spinner.text = 'Almost done...🤓';
      resolve(evaluate(args));
    }, 2000);

  }).then(result => {

    setTimeout(() => {
      spinner.stop();
      console.log(`Result: ${result}`);
    }, 1000);

  }).catch(err => {
    spinner.stop();
    console.error(err);
  });
};
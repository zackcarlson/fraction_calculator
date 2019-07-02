const menus = {
  main: `
    calc [command] <options>

    evaluate ............evaluate given math expression
    version .............show package version
    help ................show help menu for a command`,

  evaluate: `
    calc evaluate <options>

      <options>.....math expression wrapped in quotes
      
        Example: "2_3/8 + 9/8"
      
      If evaluating an expression beginning with a negative,
      preface expression with a space
        
        Example: " -2_3/8 + 9/8"`
};

module.exports = (args) => {
  const subCmd = args._[0] === 'help'
    ? args._[1]
    : args._[0];

  console.log(menus[subCmd] || menus.main);
};
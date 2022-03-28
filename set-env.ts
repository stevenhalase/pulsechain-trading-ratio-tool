// Load node modules
const colors = require('colors');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.ts';

// `environment.ts` file structure
const envConfigFile = `export const environment = {
    ETHERSCAN_API_KEY: '${process.env.ETHERSCAN_API_KEY}',
    NOMICS_API_KEY: '${process.env.NOMICS_API_KEY}',
    production: '${process.env.PRODUCTION}'
};`;
console.log(
  colors.magenta(
    'The file `environment.ts` will be written with the following content: \n'
  )
);
console.log(colors.grey(envConfigFile));
fs.writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(
      colors.magenta(
        `Angular environment.ts file generated correctly at ${targetPath} \n`
      )
    );
  }
});

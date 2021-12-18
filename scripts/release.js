/* eslint-disable no-console */

const { exec } = require('child_process');

const dir = process.cwd();

const commands = `
cd ${dir}/packages/modules/next-auth; npm publish;
cd ${dir}/packages/modules/next-base; npm publish;
cd ${dir}/packages/modules/next-foundation; npm publish;
cd ${dir}/packages/modules/next-sanity; npm publish;
cd ${dir}/packages/modules/next-shop; npm publish;
`;

exec(commands, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
  } else if (stderr) {
    console.log(`stderr: ${stderr}`);
  } else {
    console.log(`stdout: ${stdout}`);
  }
});

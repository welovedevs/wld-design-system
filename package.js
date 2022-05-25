const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const yargs = require('yargs').argv;
const ora = require('ora');
const rimraf = require('rimraf');

const isVerbose = yargs.verbose === 'true' || yargs.verbose === true;
const TO_PRESERVE_DURING_CLEAN_UP = [
    'dist',
    'package.json',
    '.git',
    '.gitignore',
    'node_modules',
    'LICENSE.md',
    'README.md',
    'tailwind.config.js'];

const run = async () => {
    const srcPath = __dirname + '/src';
    const srcFiles = fs.readdirSync(srcPath);
    const buildingPackageSpinner = ora(`Building fresh package...`).start();
    try {
        await exec('npm run build:library');
    } catch (error) {
        buildingPackageSpinner.fail('Package build failed.');
        if (isVerbose) {
            console.error(error);
        }
        process.exit(-1);
    }
    buildingPackageSpinner.succeed('Package built.');
};

run();

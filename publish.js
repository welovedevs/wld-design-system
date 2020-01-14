const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const yargs = require('yargs').argv;
var rl = require('readline-sync');

const ERROR_PREFIX = '[❌]';
const SUCCESS_PREFIX = '[✓]';
const WARNING_PREFIX = '[⚠]';

const semver = yargs.version || 'patch';
const cleanInput = ({stdout, stderr}) => ({stdout: stdout.replace(/\n/g, ''), stderr: stderr.replace(/\n/g, '')});

const run = async () => {
    const checkMaster = await exec('git rev-parse --abbrev-ref HEAD').then(cleanInput);
    if (checkMaster.stdout !== 'master') {
        console.error(ERROR_PREFIX, 'Cannot create version when not on master.');
        process.exit(-1);
    }
    const lsFilesResult = await exec('git ls-files -m');
    if (lsFilesResult.stdout) {
        console.error(ERROR_PREFIX, 'Cannot create version with modified files. Commit or stash them.');
        process.exit(-1);
    }
    await exec(`npm version ${semver} --no-git-tag-version`);

    const packageFile = fs.readFileSync('package.json');
    const { version: inPackageVersion } = JSON.parse(packageFile);
    let version = null;
    let question = null;
    if (inPackageVersion) {
        question = 'package.json already contains a version entry, is it correct?'
    } else {
        question = 'Did not find any version, please specify one:'
    }

    rl.question(question, result => {
        version = result;
        rl.close();
    });

    await exec(`git commit -am 'up to version ${version}'`);
    console.log(`Created new version `);

    try {
        await exec('git branch build');
        await exec('git checkout build');
        console.info("Created branch build");
        await exec('git push origin build');
        console.info("pushed branch build");

    } catch (e) {
        console.info("Branch build already exists");
        console.info("Checking out branch and fetching latest version");
        await exec('git checkout build');
        const pullExec = await exec('git pull origin build');
        console.info("pulling branch and fetching latest version");
    }

    console.log(`Merging master to build new version`);
    await exec(`git merge master --no-ff -m "Merging master for version ${version}"`);

    console.log(`Building new package for version ${version}`);
    await exec('npm run build');
    console.log(`Creating new commit`);
    await exec('git add --all');
    await exec(`git commit --allow-empty -am  "New version build v${version}"`);
    console.log(`Creating new tag`);
    await exec(`git tag v${version}`);
    await exec(`git push origin build`);
    try {
        await exec(`git push origin :latest`);
    }
    catch (e) {
        console.debug("Something went wrong while creating 'latest' tag",e )
    }
    await exec(`git tag latest`);
    await exec(`git push --tags`);
    console.log(`Published new version ${version}`);
    await exec(`git checkout master`);
    await exec(`git push origin master`);

}

run()

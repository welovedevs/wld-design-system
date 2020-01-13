const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const yargs = require('yargs').argv;

const semver = yargs.version || 'patch';
const cleanInput = ({stdout, stderr}) => ({stdout: stdout.replace(/\n/g, ''), stderr: stderr.replace(/\n/g, '')});

const run = async () => {
    const checkMaster = await exec('git rev-parse --abbrev-ref HEAD').then(cleanInput);
    console.log(checkMaster)
    if (checkMaster.stdout !== 'master') {
        console.error('Cannot create version when not on master');
        process.exit(-1);
    }
    const lsFilesResult = await exec('git ls-files -m');
    if (lsFilesResult.stdout) {
        console.error('Cannot create version with modified files');
        process.exit(-1);
    }
    try {
        await exec('git branch build');
        await exec('git checkout build');

        console.info("Created branch build");
        await exec('git push origin build');
        console.info("pushed branch build");

    } catch (e) {
        console.debug(e);
        console.info("Branch build already exists");
        console.info("Checking out branch and fetching latest version");
        await exec('git checkout build');
        const pullExec = await exec('git pull origin build');
        console.info("pulling branch and fetching latest version");

    }

    await exec(`npm version ${semver} --no-git-tag-version`);
    const packageFile = fs.readFileSync('package.json');
    const {version} = JSON.parse(packageFile);
    console.log(`Building new version ${version}`);
    await exec('npm run build');
    console.log(`Creating new commit`);
    await exec('git add --all');
    await exec(`git commit -am "Up to version. v${version}"`);
    console.log(`Creating new tag`);
    await exec(`git tag v${version}`);
    await exec(`git push origin build`);
    await exec(`git push --tags`);
    console.log(`Published new version ${version}`);
}

run()

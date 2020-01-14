const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const yargs = require('yargs').argv;
const rl = require('readline-sync');
const ora = require('ora');

let semver = yargs.version || 'patch';
const cleanInput = ({ stdout, stderr }) => ({ stdout: stdout.replace(/\n/g, ''), stderr: stderr.replace(/\n/g, '') });

const VALID_SEMVER = ['patch', 'minor', 'major', 'prepatch', 'preminor', 'premajor', 'prerelease'];

const run = async () => {
    semver = rl.keyInSelect(VALID_SEMVER, 'ℹ What kind of build is it?');
    if (semver === -1) {
        process.exit(-1);
    }
    const checkMasterSpinner = ora('Checking current branch...').start();
    const checkMaster = await exec('git rev-parse --abbrev-ref HEAD').then(cleanInput);
    if (checkMaster.stdout !== 'master') {
        checkMasterSpinner.fail('Cannot create version when not on master.');
        process.exit(-1);
    }
    checkMasterSpinner.succeed('Current branch is master.');
    const filesResultSpinner = ora('Checking for modified files...');
    const lsFilesResult = await exec('git ls-files -m');
    if (lsFilesResult.stdout) {
        filesResultSpinner.fail('Cannot create version with modified files. Commit or stash them.');
        process.exit(-1);
    }
    filesResultSpinner.succeed('No modified files found.');
    const upgradingVersionSpinner = ora('Bumping package version...').start();
    try {
        await exec(`npm version ${semver} --no-git-tag-version`);
    } catch {
        upgradingVersionSpinner.fail('Could not bump version.');
        process.exit(-1);
    }
    const packageFile = fs.readFileSync('package.json');
    const { version } = JSON.parse(packageFile);
    upgradingVersionSpinner.succeed(`Bumped version to ${version}.`);
    const commitMasterNewVersionSpinner = ora('Committing new version on local master branch...').start();
    try {
        await exec(`git commit -am 'Bump version to ${version}'.`);
    } catch {
        commitMasterNewVersionSpinner.fail('Could not commit new version on local master branch.');
        process.exit(-1);
    }
    commitMasterNewVersionSpinner.succeed('Created new version commit on local master branch.');
    const createBuildBranchSpinner = ora('Trying to create build branch.').start();
    try {
        await exec('git branch build');
        createBuildBranchSpinner.succeed('Created build branch.');
    } catch {
        createBuildBranchSpinner.info('Branch build already exists.');
    }
    const checkingOutBuildBranchSpinner = ora('Checking out build branch...').start();
    try {
        await exec('git checkout build');
    } catch {
        checkingOutBuildBranchSpinner.fail('Could not checkout build branch.');
        process.exit(-1);
    }
    checkingOutBuildBranchSpinner.succeed('Checked out build branch.');
    const pullingBuildBranchSpinner = ora('Pulling remote branch and fetching latest version.').start();
    try {
        await exec('git pull origin build');
        pullingBuildBranchSpinner.succeed('Pulled remote branch.');
    } catch {
        pullingBuildBranchSpinner.info('Could not pull remote branch, might not have been pushed yet.');
    }

    const mergingMasterToBuildSpinner = ora('Merging master in current build branch...').start();
    try {
        await exec(`git merge master --no-ff -m "Merging master for version ${version}".`);
    } catch {
        mergingMasterToBuildSpinner.fail('Could not merge master in current build branch.');
        process.exit(-1);
    }
    mergingMasterToBuildSpinner.succeed('Merged master in current build branch.');
    const buildingPackageSpinner = ora(`Building fresh package...`).start();
    try {
        await exec('npm run build');
    } catch {
        buildingPackageSpinner.fail('Package build failed.');
        process.exit(-1);
    }
    buildingPackageSpinner.succeed('Package built.');

    const committingNewBuildSpinner = ora('Committing freshly made package build...').start();
    try {
        await exec('git add --all');
        await exec(`git commit --allow-empty -am  "New version build : ${version}."`);
    } catch {
        committingNewBuildSpinner.fail('Could not commit new package build.');
        process.exit(-1);
    }
    committingNewBuildSpinner.succeed('Committed new package build.');

    const creatingNewVersionTagSpinner = ora('Creating new version tag...').start();
    try {
        await exec(`git tag v${version}`);
    } catch {
        creatingNewVersionTagSpinner.fail('Could not create new version tag.');
        process.exit(-1);
    }
    creatingNewVersionTagSpinner.succeed('Created new version tag.');

    const pushingBuildBranchSpinner = ora('Pushing local build branch...').start();
    try {
        await exec(`git push origin build`);
    } catch {
        pushingBuildBranchSpinner.fail('Could not push local build branch.');
        process.exit(-1);
    }
    pushingBuildBranchSpinner.succeed('Pushed local build branch.');

    const pushingTagsSpinner = ora(`Publishing version ${version}...`).start();
    try {
        await exec(`git push --tags`);
    } catch {
        pushingTagsSpinner.fail(`Could not publish new version ${version}.`);
    }
    pushingTagsSpinner.succeed(`Published version ${version}.`);

    const checkingOutMasterSpinner = ora('Checking out master branch...');
    try {
        await exec(`git checkout master`);
    } catch {
        checkingOutMasterSpinner.fail('Could not check out master.');
        process.exit(-1);
    }
    checkingOutMasterSpinner.succeed('Checked out master.');

    const pushingMasterSpinner = ora('Pushing local master branch...').start();
    try {
        await exec(`git push origin master`);
    } catch {
        pushingMasterSpinner.fail('Could not push local master branch.');
    }
    pushingMasterSpinner.succeed('Pushed local master branch.');
    console.log('\n✅ Package published successfully.');
    process.exit(0);
};

run();

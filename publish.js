const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const yargs = require('yargs').argv;
const rl = require('readline-sync');
const ora = require('ora');
require('colors');

let semver = yargs.version || 'patch';
const isVerbose = yargs.verbose === 'true' || yargs.verbose === true;
const cleanInput = ({ stdout, stderr }) => ({ stdout: stdout.replace(/\n/g, ''), stderr: stderr.replace(/\n/g, '') });

const TO_PRESERVE_IN_BUILD = ['node_modules', '.gitignore', 'package.json', 'yarn.lock'];

const VALID_SEMVER = ['patch', 'minor', 'major', 'prepatch', 'preminor', 'premajor', 'prerelease'];

const run = async () => {
    if (isVerbose) {
        console.log('ℹ Starting publishing package in verbose mode.');
    }
    semverIndex = rl.keyInSelect(VALID_SEMVER, 'ℹ What kind of build is it?');
    if (semverIndex === -1) {
        process.exit(-1);
    }
    semver = VALID_SEMVER[semverIndex];
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
    } catch (error) {
        upgradingVersionSpinner.fail('Could not bump version.');
        if (isVerbose) {
            console.error(error);
        }
        process.exit(-1);
    }
    const packageFile = fs.readFileSync('package.json');
    const { version } = JSON.parse(packageFile);
    upgradingVersionSpinner.succeed(`Bumped version to ${version}.`);
    const commitMasterNewVersionSpinner = ora('Committing new version on local master branch...').start();
    try {
        await exec(`git commit -am 'Bump version to ${version}'.`);
    } catch (error) {
        commitMasterNewVersionSpinner.fail('Could not commit new version on local master branch.');
        if (isVerbose) {
            console.error(error);
        }
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
    } catch (error) {
        checkingOutBuildBranchSpinner.fail('Could not checkout build branch.');
        if (isVerbose) {
            console.error(error);
        }
        process.exit(-1);
    }
    checkingOutBuildBranchSpinner.succeed('Checked out build branch.');
    const pullingBuildBranchSpinner = ora('Pulling remote branch and fetching latest veçrsion.').start();
    try {
        await exec('git pull origin build');
        pullingBuildBranchSpinner.succeed('Pulled remote branch.');
    } catch {
        pullingBuildBranchSpinner.info('Could not pull remote branch, might not have been pushed yet.');
    }

    const removingLegacyElementsSpinner = ora('Removing legacy elements...').start();
    let rootFiles = fs.readdirSync(__dirname);
    if (rootFiles && rootFiles.length) {
        removingLegacyElementsSpinner.text = `Removing ${rootFiles.length} legacy element${rootFiles.length > 1 ? 's' : ''}...`;
        rootFiles = rootFiles.filter(name => !TO_PRESERVE_IN_BUILD.includes(name));
        rootFiles.forEach((name, index) => {
            removingLegacyElementsSpinner.text = `Removing ${rootFiles.length} legacy element${rootFiles.length > 1 ? 's' : ''} (${index + 1} / ${rootFiles.length})...`;
            fs.unlinkSync(__dirname + `/${name}`);
        });
    }
    removingLegacyElementsSpinner.succeed('Removed legacy elements.');

    const mergingMasterSourcesSpinner = ora('Merging master sources...').start();
    try {
        await exec('git checkout master src');
    } catch (error) {
        mergingMasterSourcesSpinner.fail('Could not merge master sources.');
        if (isVerbose) {
            console.error(error);
        }
        process.exit(-1);
    }
    mergingMasterSourcesSpinner.succeed('Merged master sources.');

    const srcPath = __dirname + '/src';
    const srcFiles = fs.readdirSync(srcPath);
    if (srcFiles) {
        const removingAllPreviouslyBuildedElementsSpinner = ora('Removing previously builded elements...').start();
        srcFiles.forEach((fileName, index) => {
            const path = __dirname + `${fileName}`;
            if (fs.existsSync(path)) {
                fs.unlinkSync(path);
            }
            removingAllPreviouslyBuildedElementsSpinner.text = `Removing previously builded elements (${index + 1} / ${srcFiles.length})...`
        });
        removingAllPreviouslyBuildedElementsSpinner.succeed('Removed previously builded elements...');
    }

    const buildingPackageSpinner = ora(`Building fresh package...`).start();
    try {
        await exec('npm run build');
    } catch (error) {
        buildingPackageSpinner.fail('Package build failed.');
        if (isVerbose) {
            console.error(error);
        }
        process.exit(-1);
    }
    buildingPackageSpinner.succeed('Package built.');

    if (fs.existsSync(srcPath)) {
        const removingMasterSourcesInBuildSpinner = ora('Removing previously added sources...').start();
        fs.unlinkSync(srcPath);
        removingMasterSourcesInBuildSpinner.succeed('Removed previously added sources.');
    }

    const committingNewBuildSpinner = ora('Committing freshly made package build...').start();
    try {
        await exec('git add --all');
        await exec(`git commit --allow-empty -am  "New version build : ${version}."`);
    } catch (error) {
        committingNewBuildSpinner.fail('Could not commit new package build.');
        if (isVerbose) {
            console.error(error);
        }
        process.exit(-1);
    }
    committingNewBuildSpinner.succeed('Committed new package build.');

    const creatingNewVersionTagSpinner = ora('Creating new version tag...').start();
    try {
        await exec(`git tag v${version}`);
    } catch (error) {
        creatingNewVersionTagSpinner.fail('Could not create new version tag.');
        if (isVerbose) {
            console.error(error);
        }
        process.exit(-1);
    }
    creatingNewVersionTagSpinner.succeed('Created new version tag.');

    const pushingBuildBranchSpinner = ora('Pushing local build branch...').start();
    try {
        await exec(`git push origin build`);
    } catch (error) {
        pushingBuildBranchSpinner.fail('Could not push local build branch.');
        if (isVerbose) {
            console.error(error);
        }
        process.exit(-1);
    }
    pushingBuildBranchSpinner.succeed('Pushed local build branch.');

    const pushingTagsSpinner = ora(`Publishing version ${version}...`).start();
    try {
        await exec(`git push --tags`);
    } catch (error) {
        pushingTagsSpinner.fail(`Could not publish new version ${version}.`);
        if (isVerbose) {
            console.error(error);
        }
        process.exit(-1);
    }
    pushingTagsSpinner.succeed(`Published version ${version}.`);

    const checkingOutMasterSpinner = ora('Checking out master branch...');
    try {
        await exec(`git checkout master`);
    } catch (error) {
        checkingOutMasterSpinner.fail('Could not check out master.');
        if (isVerbose) {
            console.error(error);
        }
        process.exit(-1);
    }
    checkingOutMasterSpinner.succeed('Checked out master.');

    const pushingMasterSpinner = ora('Pushing local master branch...').start();
    try {
        await exec(`git push origin master`);
    } catch (error) {
        pushingMasterSpinner.fail('Could not push local master branch.');
        if (isVerbose) {
            console.error(error);
        }
        process.exit(-1);
    }
    pushingMasterSpinner.succeed('Pushed local master branch.');
    console.log('\n✅ Package published successfully.');
    process.exit(0);
};

run();

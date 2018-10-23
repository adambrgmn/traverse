/* eslint-disable no-console, import/no-extraneous-dependencies */
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const execa = require('execa');
const ora = require('ora');
const pkg = require('../package.json');
const manifest = require('../dist/manifest.json');

const writeFile = promisify(fs.writeFile);

const updateManifest = async ({ version }) => {
  try {
    const manifestPath = path.resolve(__dirname, '../dist/manifest.json');
    const manifestContent = JSON.stringify({ ...manifest, version }, null, 2);

    await writeFile(manifestPath, manifestContent, 'utf-8');
  } catch (err) {
    // void
  }
};

async function run() {
  const spinner = ora('Bundling extension').start();

  try {
    await updateManifest(pkg);

    const distPath = path.resolve(__dirname, '../dist');
    const archiveFile = path.resolve(
      distPath,
      `${pkg.name}-${pkg.version}.zip`,
    );

    await execa('mv', ['key.crx', 'dist/key.crx']);
    await execa('mv', ['key.pem', 'dist/key.pem']);
    await execa('zip', ['-r', archiveFile, './dist']);
    spinner.succeed('Extension bundled');
  } catch (err) {
    spinner.fail('Failed creating bundle');
  }
}

run();

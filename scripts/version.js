/* eslint-disable */

const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const async = require('async');
const _ = require('lodash');

const options = {
  absolute: true,
  follow: true,
  ignore: ['**/node_modules/**'],
};

const coreVersions = {
  next: '^12.0.7',
};

const main = require(path.join(__dirname, '..', 'package.json'));

console.log(`Synchronising version: ${main.version}`);

glob('**/package.json', options, (err, modules) => {
  if (err) throw err;

  const dependencies = [];
  const dependents = [];

  async.forEach(
    modules,
    async (filename) => {
      const pkg = await fs.readJSON(filename);
      if (filename.indexOf('/packages/modules/') > 0) {
        dependencies.push({ filename, pkg });
        if (pkg.version != main.version) {
          console.log(
            `+ Module: ${pkg.name} - ${pkg.version} => ${main.version}`
          );
          pkg.version = main.version;
          await fs.writeJSON(filename, pkg, { spaces: 2 });
        } else {
          console.log(`+ Application: ${pkg.name} - ${pkg.version}`);
        }
      } else {
        dependents.push({ filename, pkg });
      }
    },
    (err) => {
      if (err) throw err;

      const lookup = _.reduce(
        dependencies,
        (memo, { pkg }) => {
          memo[pkg.name] = `^${pkg.version}`;
          return memo;
        },
        coreVersions
      );

      async.forEach(
        dependents.concat(dependencies),
        async ({ filename, pkg }) => {
          console.log(`- Updating: ${pkg.name}`);
          pkg.dependencies = updateDepedencies(pkg.dependencies, lookup);
          pkg.devDependencies = updateDepedencies(pkg.devDependencies, lookup);
          pkg.peerDependencies = updateDepedencies(
            pkg.peerDependencies,
            lookup
          );
          await fs.writeJSON(filename, pkg, { spaces: 2 });
        }
      );
    }
  );

  function updateDepedencies(dependencies, lookup) {
    if (!_.isPlainObject(dependencies)) return;
    return _.reduce(
      dependencies,
      (memo, version, name) => {
        memo[name] = lookup[name] ?? version;
        return memo;
      },
      {}
    );
  }
});

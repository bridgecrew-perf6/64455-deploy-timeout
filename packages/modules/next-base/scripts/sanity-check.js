/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

const logger = require('node-color-log');

const { parse } = require('@atelierfabien/next-sanity/lib/util');

const prettier = require('prettier');

const queries = require('../src/sanity/queries');

const standalone = [
  'assetsProjection',
  'categoriesProjection',
  'fragmentsProjection',
  'nodesProjection',
  'sectionsProjection',
  'relatedProductsProjection',
  'variantImageProjection',
];

const baseDir = path.join(process.cwd(), 'src', 'sanity', 'groq');

function preprocess(q) {
  return q.replace(/pt::text\((.*)\)/g, '$1');
}

function check(q) {
  return parse(preprocess(q));
}

function format(q, name) {
  return prettier.format(preprocess(q), { filepath: `${name}.groq` });
}

async function process(name, query) {
  if (typeof query !== 'string') return [name, typeof query]; // skip

  if (name.match(/query$/i)) {
    const q = query;
    try {
      const ast = check(q);
      logger.color('green').log(`Checked query ${name} - OK`);
      return [name, format(q, name), ast];
    } catch (err) {
      logger.color('red').log('Failed query:', name, String(err));
      logger.log(preprocess(q));
      throw err;
    }
  } else if (standalone.includes(name) || name.match(/pipeline$/i)) {
    const q = `*[]{ 'value': ${query} }`;
    try {
      const ast = check(q);
      logger.color('green').log(`Checked custom ${name} - OK`);
      return [name, format(q, name), ast];
    } catch (err) {
      logger.color('red').log('Failed custom:', name, String(err));
      logger.log(preprocess(q));
      throw err;
    }
  } else if (name.match(/predicate$/i)) {
    const q = `*[${query}]`;
    try {
      const ast = check(q);
      logger.color('green').log(`Checked predicate ${name} - OK`);
      return [name, format(q, name), ast];
    } catch (err) {
      logger.color('red').log('Failed predicate:', name, String(err));
      logger.log(preprocess(q));
      throw err;
    }
  } else if (name.match(/projection$/i)) {
    const q = `*[]{ ${query} }`;
    try {
      const ast = check(q);
      logger.color('green').log(`Checked projection ${name} - OK`);
      return [name, format(q, name), ast];
    } catch (err) {
      logger.color('red').log('Failed projection:', name, String(err));
      logger.log(preprocess(q));
      throw err;
    }
  } else {
    return [name, typeof query];
  }
}

const changed = [];
const skipped = [];

Object.entries(queries)
  .reduce(
    (promise, [name, query]) =>
      promise
        .then(() => process(name, query))
        .then(async ([name, formatted, ast]) => {
          if (ast && formatted && formatted.includes('undefined')) {
            logger.color('red').log(`Unresolved code segment in ${name}.groq`);
          }
          if (ast && formatted) {
            const filepath = path.join(baseDir, `${name}.groq`);
            const exists = fs.existsSync(filepath);
            if (exists) {
              // logger.dim().log(`Overwriting: ${name}.groq`);
              const previous = await fs.promises.readFile(filepath, 'utf8');
              if (previous !== formatted) changed.push(` ${name}.groq`);
            } else {
              logger.color('magenta').log(`Writing: ${name}.groq`);
            }
            return fs.promises.writeFile(filepath, formatted, 'utf8');
          } else if (formatted) {
            skipped.push(`${name} (${formatted})`);
          }
        }),
    Promise.resolve()
  )
  .then(() => {
    if (changed.length > 0) console.log('');
    changed.forEach((target) =>
      logger.color('magenta').log(`Changed: ${target}`)
    );
    if (skipped.length > 0) console.log('');
    skipped.forEach((target) => logger.color('cyan').log(`Skipped: ${target}`));
    if (changed.length > 0 || skipped.length > 0) console.log('');
    logger.color('blue').log('Checked all GROQ code');
  });

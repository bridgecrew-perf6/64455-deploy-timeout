/* eslint-disable no-undef */

require('should');

const { omit } = require('@atelierfabien/next-foundation/server');

const fs = require('fs');

const path = require('path');

const axios = require('axios');

const apiUrl = 'http://localhost:3000/api/algolia/dev';

const omitted = ['updatedAt', 'publishedAt'];

describe('Algolia', () => {
  describe('Locale: en', () => {
    const filepath = path.join(__dirname, 'fixtures', 'algolia.en.json');

    // it('should fetch data in correct format', async () => {
    //   const response = await axios.get(apiUrl);
    //   return fs.promises.writeFile(
    //     filepath,
    //     JSON.stringify(normalize(response.data, omitted), null, 4),
    //     'utf8'
    //   );
    // });

    it('should compare to fixture', async () => {
      const response = await axios.get(apiUrl);
      const previous = await fs.promises.readFile(filepath, 'utf8');
      const previousData = JSON.parse(previous);
      normalize(response.data, omitted).should.eql(previousData);
    });
  });

  describe('Locale: nl', () => {
    const filepath = path.join(__dirname, 'fixtures', 'algolia.nl.json');

    // it('should fetch data in correct format', async () => {
    //   const response = await axios.get(`${apiUrl}?locale=nl`);
    //   return fs.promises.writeFile(
    //     filepath,
    //     JSON.stringify(normalize(response.data, omitted), null, 4),
    //     'utf8'
    //   );
    // });

    it('should compare to fixture', async () => {
      const response = await axios.get(`${apiUrl}?locale=nl`);
      const previous = await fs.promises.readFile(filepath, 'utf8');
      const previousData = JSON.parse(previous);
      normalize(response.data, omitted).should.eql(previousData);
    });
  });
});

function normalize(data, omitted = []) {
  return data.map(item => omit(item, omitted));
}

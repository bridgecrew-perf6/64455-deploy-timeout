/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable no-undef */

require('dotenv-flow').config();

require('should');

const fs = require('fs');
const path = require('path');

const axios = require('axios');

const algoliasearch = require('algoliasearch');

const algoliaAppId = process.env.ALGOLIA_APP_ID;
const algoliaAdminApiKey = process.env.ALGOLIA_ADMIN_API_KEY;
const algoliaWebhookToken = process.env.ALGOLIA_WEBHOOK_TOKEN;
const algoliaIndexBasename = process.env.ALGOLIA_INDEX_BASENAME;

const algolia = algoliasearch(algoliaAppId, algoliaAdminApiKey);

const settingsFile = path.join(
  __dirname,
  '..',
  'data',
  'algolia',
  `products.json`
);

const webhookUrl = locale =>
  `http://localhost:3000/api/algolia/webhook/${locale}?token=${algoliaWebhookToken}&replace=true`;

const getIndex = locale =>
  algolia.initIndex(`${algoliaIndexBasename}_${locale}`);

const getMasterSettings = async (locale = 'en') => {
  const data = await fs.promises.readFile(settingsFile, 'utf-8');
  const { settings } = JSON.parse(data);
  settings.replicas = (settings.replicas ?? []).map(name => {
    return name.replace(
      `${algoliaIndexBasename}_en`,
      `${algoliaIndexBasename}_${locale}`
    );
  });
  return settings;
};

const forwardToReplicas = false;

// NOTE the default locale (en) is the master index for settings

describe('Algolia', () => {
  describe('Settings', () => {
    it('should retrieve base settings', async () => {
      const index = getIndex('en');
      const settings = await index.getSettings();
      settings.replicas = settings.replicas ?? [];
      return fs.promises.writeFile(
        settingsFile,
        JSON.stringify({ settings }, null, 2),
        'utf-8'
      );
    });

    it('should apply settings: en', async () => {
      const index = getIndex('en');
      const masterSettings = await getMasterSettings('en');
      return index.setSettings(masterSettings, { forwardToReplicas });
    });

    it('should apply settings: nl', async () => {
      const index = getIndex('nl');
      const masterSettings = await getMasterSettings('nl');
      return index.setSettings(masterSettings, { forwardToReplicas });
    });

    it('should have applied settings: en', async () => {
      const index = getIndex('en');
      const settings = await index.getSettings();
      const masterSettings = await getMasterSettings('en');
      settings.should.eql(masterSettings);
    });

    it('should have applied settings: nl', async () => {
      const index = getIndex('nl');
      const settings = await index.getSettings();
      const masterSettings = await getMasterSettings('nl');
      settings.should.eql(masterSettings);
    });
  });

  describe('Replace All: en', () => {
    const locale = 'en';

    it('should re-index all', async () => {
      const response = await axios.get(webhookUrl(locale));
      response.data.should.containEql({ locale, replace: true });
      response.data.count.should.be.above(0);
      console.log(response.data);
    });
  });

  describe('Replace All: nl', () => {
    const locale = 'nl';

    it('should re-index all', async () => {
      const response = await axios.get(webhookUrl(locale));
      response.data.should.containEql({ locale, replace: true });
      response.data.count.should.be.above(0);
      console.log(response.data);
    });
  });
});

/* eslint-disable no-undef */

require('should');

const { cloneDeep } = require('@atelierfabien/next-foundation/server');

const axios = require('axios');

const completedPayload = require('./fixtures/snipcart.completed.json');
const cancelledPayload = require('./fixtures/snipcart.cancelled.json');

const webhookUrl = 'http://localhost:3000/api/snipcart';

function buildPayload(basePayload, id, quantity = 1) {
  const clone = cloneDeep(basePayload);
  clone.content.items[0].id = id;
  clone.content.items[0].uniqueId = id;
  clone.content.items[0].quantity = quantity;
  return clone;
}

describe('Snipcart', () => {
  describe('With Master', () => {
    const targetId = '3113468a-87f4-46e5-b71d-c415c5451da1';

    let initialQuantity = 0;

    it('should fetch initial inventory', async () => {
      const response = await axios.get(`${webhookUrl}/products/${targetId}`);
      initialQuantity = response.data.quantity;
      response.data.quantity.should.be.above(0);
    });

    it('should update the inventory when order is completed', async () => {
      const payload = buildPayload(completedPayload, targetId, 2);
      const response = await axios.post(webhookUrl, payload);
      response.data.ok.should.be.true();
      response.data.ids.should.not.be.empty();
    });

    it('should fetch current inventory', async () => {
      const response = await axios.get(`${webhookUrl}/products/${targetId}`);
      response.data.quantity.should.equal(initialQuantity - 2);
    });

    it('should update the inventory when order is cancelled', async () => {
      const payload = buildPayload(cancelledPayload, targetId, 2);
      const response = await axios.post(webhookUrl, payload);
      response.data.ok.should.be.true();
      response.data.ids.should.not.be.empty();
    });

    it('should fetch current inventory - back to inital', async () => {
      const response = await axios.get(`${webhookUrl}/products/${targetId}`);
      response.data.quantity.should.equal(initialQuantity);
    });
  });

  describe('With Variant', () => {
    const targetId = '519e0a9c-c95a-46d9-84f8-99aba9eabfef';

    let initialQuantity = 0;

    it('should fetch initial inventory', async () => {
      const response = await axios.get(`${webhookUrl}/products/${targetId}`);
      initialQuantity = response.data.quantity;
      response.data.quantity.should.be.above(0);
    });

    it('should update the inventory when order is completed', async () => {
      const payload = buildPayload(completedPayload, targetId, 2);
      const response = await axios.post(webhookUrl, payload);
      response.data.ok.should.be.true();
      response.data.ids.should.not.be.empty();
    });

    it('should fetch current inventory', async () => {
      const response = await axios.get(`${webhookUrl}/products/${targetId}`);
      response.data.quantity.should.equal(initialQuantity - 2);
    });

    it('should update the inventory when order is cancelled', async () => {
      const payload = buildPayload(cancelledPayload, targetId, 2);
      const response = await axios.post(webhookUrl, payload);
      response.data.ok.should.be.true();
      response.data.ids.should.not.be.empty();
    });

    it('should fetch current inventory - back to inital', async () => {
      const response = await axios.get(`${webhookUrl}/products/${targetId}`);
      response.data.quantity.should.equal(initialQuantity);
    });
  });
});

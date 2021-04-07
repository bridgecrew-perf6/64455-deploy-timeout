import preval from 'next-plugin-preval';

async function getData() {
  return {
    default: 'EUR',
    currencies: {
      'EUR': { name: 'Euro', rate: 1 },
      'USD': { name: 'US Dollar', rate: 1.19 }
    }
  };
}

export default preval(getData());
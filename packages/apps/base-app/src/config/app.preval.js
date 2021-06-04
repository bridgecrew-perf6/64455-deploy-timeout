import preval from 'next-plugin-preval';

const config = {};

async function getData() {
  return config;
}

export default preval(getData());

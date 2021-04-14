import preval from 'next-plugin-preval';

async function getData() {
  return {};
}

export default preval(getData());
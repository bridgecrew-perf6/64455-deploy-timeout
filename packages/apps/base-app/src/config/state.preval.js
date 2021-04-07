import preval from 'next-plugin-preval';

async function getData() {
  return {
    colors: ['yellow', 'blue', 'orange']
  };
}

export default preval(getData());
import axios from 'axios';

export const signUp = async (data) => {
  const res = await axios.post('/api/sanity/signUp', {
    ...data,
  });

  return res.data;
};

import axios from 'axios';

export * from 'next-auth/client';

export const signUp = async (data) => {
  const res = await axios.post('/api/sanity/signUp', {
    ...data,
  });

  return res.data;
};

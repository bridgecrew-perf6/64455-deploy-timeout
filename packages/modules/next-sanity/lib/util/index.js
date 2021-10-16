export * from 'groq-js';

export const deduceItem = (data, isPreview) => {
  if (!Array.isArray(data)) {
    return data;
  } else if (data.length === 1) {
    return data[0];
  } else if (isPreview) {
    return data.find((item) => item._id.startsWith(`drafts.`)) || data[0];
  } else {
    return data[0];
  }
};

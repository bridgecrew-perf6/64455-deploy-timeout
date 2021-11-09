import { handleWebhookRequest } from '@app/sanity/server/algolia';

export default async (req, res) => handleWebhookRequest(req, res);

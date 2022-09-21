import { createAPI } from '@bille/developer-kit';

export const billespaceAPI = createAPI({
  url: `${process.env['NX_BILLESPACE_API_URL']}`,
});

'use strict';

import DbClientProvider from './aws/dynamodb-client.mjs';

DbClientProvider.getInstance().init();

export { getProductsById } from './src/functions/getProductsById.mjs';
export { getProductsList } from './src/functions/getProductsList.mjs';
export { createProduct } from './src/functions/createProduct.mjs';

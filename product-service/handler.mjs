'use strict';

import DbClientProvider from './aws/dynamodb-client.mjs';
import SnsClientProvider from './aws/sns-client.mjs';

DbClientProvider.getInstance().init();
SnsClientProvider.getInstance().init();

export { getProductsById } from './src/functions/getProductsById.mjs';
export { getProductsList } from './src/functions/getProductsList.mjs';
export { createProduct } from './src/functions/createProduct.mjs';
export { catalogBatchProcess } from './src/functions/catalogBatchProcess.mjs'

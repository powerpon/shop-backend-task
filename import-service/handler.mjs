'use strict';

import S3ClientProvider from './aws/s3-client.mjs';
import SqsClientProvider from './aws/sqs-client.mjs';

S3ClientProvider.getInstance().init();
SqsClientProvider.getInstance().init();

export { importProductsFile } from './src/functions/importProductsFile.mjs';
export { importFileParser } from './src/functions/importFileParser.mjs';

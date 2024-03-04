import { GetObjectCommand, CopyObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import S3ClientProvider from "../../aws/s3-client.mjs";
import csvParser from 'csv-parser';
import SqsClientProvider from "../../aws/sqs-client.mjs";
import { SendMessageCommand } from "@aws-sdk/client-sqs";

export async function importFileParser(event) {
    try{
        const s3Client = S3ClientProvider.getInstance().s3Client;
        const sqsClient = SqsClientProvider.getInstance().sqsClient;
        for (const record of event.Records){
            const bucketName = record.s3.bucket.name;
            const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, ' '));
            const s3Object = await s3Client.send(new GetObjectCommand(
                {
                    Bucket: bucketName, Key: key
                }
            ));
            s3Object.Body.pipe(csvParser())
            .on('data', async (data) => {
                await sqsClient.send(new SendMessageCommand({
                    QueueUrl: process.env.SQS_URL,
                    DelaySeconds: 0,
                    MessageBody: JSON.stringify(data)
                }));
            })
            .on('error', (error) => {
                console.error(error);
            })
            .on('end', () => {
                console.log('Reading items end');
            });
            const newKey = key.replace('uploaded/', 'parsed/');
            await s3Client.send(new CopyObjectCommand({
                Bucket: bucketName,
                CopySource: `${bucketName}/${key}`,
                Key: newKey
            }));
            await s3Client.send(new DeleteObjectCommand({
                Bucket: bucketName,
                Key: key
            }));
        }
    }catch(err){
        console.error(err);
    }
}

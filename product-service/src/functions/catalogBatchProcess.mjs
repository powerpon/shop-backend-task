import { BatchWriteItemCommand } from "@aws-sdk/client-dynamodb";
import DbClientProvider from "../../aws/dynamodb-client.mjs";
import {v4 as uuid} from 'uuid';
import { marshall } from "@aws-sdk/util-dynamodb";
import ProductModel from "../models/product.model.mjs";
import SnsClientProvider from "../../aws/sns-client.mjs";
import { PublishCommand } from "@aws-sdk/client-sns";

export async function catalogBatchProcess(event) {
    try{
        const dbClient = DbClientProvider.getInstance().dbClient;
        const snsClient = SnsClientProvider.getInstance().snsClient;
        const putRequestsBatch = [];
        for(const record of event.Records) {
            const bodyParsed = JSON.parse(record.body);
            const product = new ProductModel(uuid(), bodyParsed.description, bodyParsed.price, bodyParsed.title);
            const putRequest = {
                PutRequest: {
                    Item: marshall(product, DbClientProvider.marshallOptions)
                }
            };
            putRequestsBatch.push(putRequest);
        }
        await dbClient.send(new BatchWriteItemCommand({
            RequestItems: {
                [process.env.PRODUCTS_TABLE_NAME]: putRequestsBatch
            }
        }));
        await snsClient.send(new PublishCommand({
            Message: JSON.stringify(event),
            TopicArn: process.env.SNS_TOPIC_ARN
        }));
    } catch(err) {
        console.error(err);
    }
}

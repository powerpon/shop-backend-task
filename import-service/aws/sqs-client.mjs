import { SQSClient } from "@aws-sdk/client-sqs";

export default class SqsClientProvider {
    static instance;
    sqsClient;

    constructor(){}

    init(){
        this.sqsClient = new SQSClient(
            {
                region: process.env.SQS_REGION,
            }
        );
    }

    static getInstance() {
        SqsClientProvider.instance = SqsClientProvider.instance || new SqsClientProvider();
        return SqsClientProvider.instance;
    }
}

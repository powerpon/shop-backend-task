import { SNSClient } from "@aws-sdk/client-sns";

export default class SnsClientProvider {
    static instance;
    snsClient;

    constructor(){}

    init(){
        this.snsClient = new SNSClient(
            {
                region: process.env.SNS_REGION,
            }
        );
    }

    static getInstance() {
        SnsClientProvider.instance = SnsClientProvider.instance || new SnsClientProvider();
        return SnsClientProvider.instance;
    }
}

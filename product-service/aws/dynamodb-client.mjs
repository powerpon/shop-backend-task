import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export default class DbClientProvider {
    static instance;
    dbClient;
    static marshallOptions = {
        removeUndefinedValues: true,
        convertClassInstanceToMap: true,
    };

    constructor(){}

    init(){
        this.dbClient = new DynamoDBClient(
            {
                region: process.env.DB_REGION,
            }
        );
    }

    destroy() {
        this.dbClient.destroy();
    }

    static getInstance() {
        DbClientProvider.instance = DbClientProvider.instance || new DbClientProvider();
        return DbClientProvider.instance;
    }
}

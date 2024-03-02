import { S3Client } from "@aws-sdk/client-s3";

export default class S3ClientProvider {
    static instance;
    s3Client;

    constructor(){}

    init(){
        this.s3Client = new S3Client(
            {
                region: process.env.S3_REGION,
            }
        );
    }

    static getInstance() {
        S3ClientProvider.instance = S3ClientProvider.instance || new S3ClientProvider();
        return S3ClientProvider.instance;
    }
}

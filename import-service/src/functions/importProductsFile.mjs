import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import S3ClientProvider from "../../aws/s3-client.mjs";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function importProductsFile(event) {
    try{
        const FRONTEND_URL = process.env.FRONTEND_URL;
        const { name } = event.queryStringParameters;
        if(!name){
            return {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": FRONTEND_URL,
                },
                body: JSON.stringify({message: "Provide Query Parameter 'name'"})
            };
        }
        const key = 'uploaded/' + name;
        const s3Client = S3ClientProvider.getInstance().s3Client;
        const uploadCommand = new PutObjectCommand({Bucket: process.env.S3_BUCKET_NAME, Key: key});
        const uploadUrl = await getSignedUrl(s3Client, uploadCommand, {expiresIn: 3600});
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": FRONTEND_URL,
            },
            body: JSON.stringify({uploadUrl})
        };
    }catch(err){
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": FRONTEND_URL,
            },
        };
    }
}

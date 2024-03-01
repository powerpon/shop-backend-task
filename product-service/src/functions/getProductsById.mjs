import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import DbClientProvider from "../../aws/dynamodb-client.mjs";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export async function getProductsById(event) {
  try{
    console.log(event);
    const FRONTEND_URL = process.env.FRONTEND_URL;
    const dbClient = DbClientProvider.getInstance().dbClient;
    const productId = event.pathParameters.productId;
    const responseProduct = await dbClient.send(new GetItemCommand({TableName: process.env.PRODUCTS_TABLE_NAME, Key: {id: {S: productId}}}));
    const responseStock = await dbClient.send(new GetItemCommand({TableName: process.env.STOCKS_TABLE_NAME, Key: {product_id: {S: productId}}}));
    if(!responseProduct.Item){
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Origin": FRONTEND_URL,
        },
        body: JSON.stringify({message: 'Product not found'}),
      }
    } 
    const result = responseStock.Item ? {...unmarshall(responseProduct.Item), count: unmarshall(responseStock.Item).count} : unmarshall(responseProduct.Item);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": FRONTEND_URL,
      },
      body: JSON.stringify(result),
    };
  } catch(err){
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": FRONTEND_URL,
      },
    }
  }
};

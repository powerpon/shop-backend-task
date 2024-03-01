import DbClientProvider from "../../aws/dynamodb-client.mjs";
import {v4 as uuid} from 'uuid';
import ProductModel from "../models/product.model.mjs";
import StockModel from "../models/stock.model.mjs";
import { PutItemCommand, TransactWriteItemsCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

export async function createProduct(event) {
  try{
    console.log(event);
    const FRONTEND_URL = process.env.FRONTEND_URL;
    const body = JSON.parse(event.body);
    const dbClient = DbClientProvider.getInstance().dbClient;
    let product;
    let stock;
    try{
      const productId = uuid();
      product = new ProductModel(productId, body.description, body.price, body.title);
      stock = new StockModel(productId, body.count);
    }catch(err){
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": FRONTEND_URL,
        },
      }
    }
    await dbClient.send(new TransactWriteItemsCommand({
      TransactItems: [
        {
          Put: {
            TableName: process.env.STOCKS_TABLE_NAME,
            Item: marshall(stock, DbClientProvider.marshallOptions)
          }
        },
        {
          Put: {
            TableName: process.env.PRODUCTS_TABLE_NAME,
            Item: marshall(product, DbClientProvider.marshallOptions)
          }
        }
      ]
    }));
    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": FRONTEND_URL,
      },
      body: JSON.stringify(product),
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

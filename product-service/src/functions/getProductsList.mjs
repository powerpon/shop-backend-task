import { ScanCommand } from "@aws-sdk/client-dynamodb";
import DbClientProvider from "../../aws/dynamodb-client.mjs";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export async function getProductsList(event) {
  try{
    console.log(event);
    const FRONTEND_URL = process.env.FRONTEND_URL;
    const dbClient = DbClientProvider.getInstance().dbClient;
    const responseProducts = await dbClient.send(new ScanCommand({TableName: process.env.PRODUCTS_TABLE_NAME}));
    const responseStocks = await dbClient.send(new ScanCommand({TableName: process.env.STOCKS_TABLE_NAME}));
    const stocks = responseStocks.Items.map((stock) => unmarshall(stock));
    const products = responseProducts.Items.map((product) => unmarshall(product));
    const result = products.map((product) => {
      const stock = stocks.find((stock) => stock.product_id === product.id);
      return stock ? {...product, count: stock.count} : product;
    })
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

import { products } from "../data.mjs";

export async function getProductsList(event) {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": process.env.frontendURL,
      },
      body: JSON.stringify(products),
    };
  };

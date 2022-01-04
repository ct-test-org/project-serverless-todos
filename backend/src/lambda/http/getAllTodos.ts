import "source-map-support/register";

import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";
import * as AWS from "aws-sdk"; // TODO: use XAWS here?

const docClient = new AWS.DynamoDB.DocumentClient();
const todosTable = "todos-dev"; // TODO: extract this into something like middy?

// import * as middy from 'middy'
// import { cors } from 'middy/middlewares'

// import { getTodosForUser as getTodosForUser } from '../../businessLogic/todos'
// import { getUserId } from '../utils';

// TODO: Get all TODO items for a current user
// export const handler = middy(
//   async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//     // Write your code here
//     const todos = '...'

//     return undefined

// handler.use(
//   cors({
//     credentials: true
//   })
// )

// TEMP - JUST GET ALL THE TODOS
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const result = await docClient
      .scan({
        TableName: todosTable,
      })
      .promise();

    const items = result.Items;

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        items,
      }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: `ERROR: 500, MSG: ${JSON.stringify(e)}`,
    };
  }
};

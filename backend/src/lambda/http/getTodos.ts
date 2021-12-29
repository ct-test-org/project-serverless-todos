import "source-map-support/register";

import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
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

// TEMPORARY HELLO FUNCTION
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("Hello, Processing event: ", event);

  // const result = await docClient
  //     .scan({
  //         TableName: groupsTable,
  //     })
  //     .promise();

  // const items = result.Items;

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      items: ["imagine: items here, HELLO Items."],
    }),
  };
};

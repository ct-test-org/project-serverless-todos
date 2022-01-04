import "source-map-support/register";

import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";
import * as AWS from "aws-sdk";
// import * as middy from "middy";
// import { cors } from "middy/middlewares";
import { CreateTodoRequest } from "../../requests/CreateTodoRequest";
import { getUserId, getMockUserId } from "../utils";
// import { createTodo } from '../../businessLogic/todos'
import { v4 } from "uuid";
const docClient = new AWS.DynamoDB.DocumentClient();
const todosTable = "todos-dev"; // TODO: extract this into something like middy?

// export const handler = middy(
//   async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//     const newTodo: CreateTodoRequest = JSON.parse(event.body);
//     // TODO: Implement creating a new TODO item

//     return undefined;
//   }
// );
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const newTodoInput: CreateTodoRequest = JSON.parse(event.body);

  const newTodo = {
    // userId: getUserId(event), // TODO:
    userId: getMockUserId(),
    todoId: v4(),
    createdAt: new Date().toISOString(),
    name: newTodoInput.name,
    dueDate: newTodoInput.dueDate, // TODO: verify this is an ISOString
    done: false, // note: we're not allowing inputting pre-done todos at this time
  };

  // newTodoInput.attachmentUrl ? // TODO: implement support for image attachments when creating todos

  try {
    await docClient
      .put({
        TableName: todosTable,
        Item: newTodo,
      })
      .promise(); // note: The ddb api does not return the inserted value here by default.

    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        newTodo,
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

  // use a try catch here TODO:
};

// handler.use(
//   cors({
//     credentials: true,
//   })
// );

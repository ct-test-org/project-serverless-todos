import "source-map-support/register";

import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda";
import * as AWS from "aws-sdk";

import { v4 } from "uuid";
const docClient = new AWS.DynamoDB.DocumentClient();

const groupsTable = process.env.GROUPS_TABLE;
const imagesTable = process.env.IMAGES_TABLE;

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const groupId = event.pathParameters.groupId;
  const validGroupId = await groupExists(groupId);

  if (!validGroupId) {
    return {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        error: "Group does not exist",
      }),
    };
  }

  const imageId = v4();
  const newItem = await createImage(groupId, imageId, event);

  return {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      newItem,
    }),
  };
};

async function groupExists(groupId: string) {
  const result = await docClient
    .get({
      TableName: groupsTable,
      Key: {
        groupId,
      },
    })
    .promise();

  console.log("Get group: ", result);

  return !!result.Item;
}

async function createImage(
  groupId: string,
  imageId: string,
  event: APIGatewayProxyEvent
) {
  const timestamp = new Date().toISOString();
  const newImage = JSON.parse(event.body);

  const newItem = {
    groupId,
    timestamp,
    imageId,
    ...newImage,
  };

  await docClient
    .put({
      TableName: imagesTable,
      Item: newItem,
    })
    .promise();

  // ddb.put returns no item, using newItem directly
  return newItem;
}

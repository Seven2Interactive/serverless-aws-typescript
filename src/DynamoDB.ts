import { DynamoDB } from "aws-sdk";

let options = {};

// connect to local DB if running offline
if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    accessKeyId: 'xxxx',
    secretAccessKey: 'xxxx',
    endpoint: 'http://localhost:8000',
  };
}

/**
 * Helper to make connections to DynamoDB.
 * When running locally, this will properly point to the local dynamo database server.
 */
export const dynamodb = new DynamoDB.DocumentClient(options);

import { APIGatewayEvent, Context, ProxyResult } from "aws-lambda";
import { PostRequest, PostResponse } from "../../api/Post";
import { dynamodb } from "../../DynamoDB";
import { DocumentClient } from "aws-sdk/lib/dynamodb/document_client";
import { v1 as uuid } from "uuid";
import { sanitizeRequest, isRequestValid } from "../../api/Validation";


/**
 * Default handler for this app
 * @param event The event which comes from the APIGateway
 * @param context The lambda context
 */
export const handler = async (event: APIGatewayEvent, context: Context): Promise<ProxyResult> => {
  if (event.body) {

    console.log('Received Post Request');
    let request: PostRequest = JSON.parse(event.body);
    console.log(JSON.stringify(request));

    // Validate the request
    if (isRequestValid(request)) {
      request = sanitizeRequest(request);
      console.log('Sanitized Request');
      console.log(JSON.stringify(request));
    } else {
        console.log('Error Request');
      // If we get to here, an error happened
      return {
        statusCode: 400,
        headers: {
          "Cache-Control": "no-store",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ success: false, msg: "Invalid request" })
      };
    }

    const postScoreResponse: PostResponse = {
      success: true,
      record: request
    };

    try {
      // Create a new unique id 
      let new_id = generateGuid();

      // connection params.
      const params: DocumentClient.PutItemInput = {
        TableName: process.env.DYNAMODB_TABLE as string,
        Item: {
          // TODO: VALIDATE THE REQUEST. DON"T DO THIS!!!
          ...request,
          id: new_id,
          timestamp: Date.now()
        }
      };

      if (process.env.IS_OFFLINE) {
        // Only log this if running locally
       console.log(JSON.stringify(params, null, 4));
      }

      let res = await dynamodb.put(params).promise();

      console.log("Got response from database");
      if (res.$response.httpResponse.statusCode == 200) {
        return respondSuccess(postScoreResponse);
      }

    } catch (err) {
      console.log("Got an error from dynamo.");
      console.log(err);
    }
  }

  // If we get to here, an error happened
  const error: ProxyResult = {
    statusCode: 400,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ success: false, msg: "an unknown error occured" })
  };

  return error;
};

function respondSuccess(postScoreResponse: PostResponse): ProxyResult {
  return {
    statusCode: 200,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(postScoreResponse)
  };
}


function generateGuid() {
    // taken from here: http://guid.us/GUID/JavaScript
    // but would use the node uuid module instead:  npm install uuid
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}
function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}



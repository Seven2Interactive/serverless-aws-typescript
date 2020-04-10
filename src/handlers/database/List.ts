import { APIGatewayEvent, Context, ProxyResult } from "aws-lambda";
import { ListResponseRecord, ListResponse } from "../../api/List";
import { dynamodb } from "../../DynamoDB";
import { DocumentClient } from "aws-sdk/lib/dynamodb/document_client";

/**
 * Default handler for this app
 * @param event The event which comes from the APIGateway
 * @param context The lambda context
 */
export const handler = async (event :APIGatewayEvent, context :Context) :Promise<ProxyResult> => {

    const cacheControlSetting: string = 'max-age=5'; // stores for 10 seconds

    const params: DocumentClient.ScanInput = {
        TableName: (process.env.DYNAMODB_TABLE as string)
    }

    try {
        const res = await dynamodb.scan(params).promise();
        
        let itemArray = (res.Items as ListResponseRecord[]);
        // Sort array here

        let listResponse: ListResponse = {
            success: true,
            records: itemArray
        }
        
        const success :ProxyResult = {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': cacheControlSetting
            },
            body: JSON.stringify(listResponse)
        }
        return success;

    } catch(err) {
        console.log("Got an error from dynamo.");
        console.error(err);
    }

    const error :ProxyResult = {
        statusCode: 500,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': cacheControlSetting
        },
        body: JSON.stringify({success: false, err:"an unknown error occured"})
    }

    return error;
}

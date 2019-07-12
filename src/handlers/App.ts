import { APIGatewayEvent, Context, ProxyResult } from "aws-lambda";


/**
 * Default handler for this app
 * @param event The event which comes from the APIGateway
 * @param context The lambda context
 */
export const handler = async (event :APIGatewayEvent, context :Context) :Promise<ProxyResult> => {

    console.log(`Got an environment variable: ${process.env.EXAMPLE_VAR}`);

    const res :ProxyResult = {
        statusCode: 200,
        body: 'success!'
    }
    return res;
}

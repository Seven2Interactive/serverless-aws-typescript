import { APIGatewayEvent, Context, ProxyResult } from "aws-lambda";

/**
 * 
 * @param event The API gateway event
 * @param context 
 */
export const handler = async (event :APIGatewayEvent, context :Context) :Promise<ProxyResult> => {

    console.log(`Got an environment variable: ${process.env.EXAMPLE_VAR}`);

    const res :ProxyResult = {
        statusCode: 200,
        body: 'success!'
    }
    return res;
}

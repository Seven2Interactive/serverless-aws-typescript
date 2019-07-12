import { APIGateway } from "aws-sdk";

export const handler = async (event :any, context :any) :Promise<APIGateway.MethodResponse> => {

    console.log(`Got an environment variable: ${process.env.EXAMPLE_VAR}`);

    const res :APIGateway.MethodResponse = {
        statusCode: "200"
    }
    return res;
}
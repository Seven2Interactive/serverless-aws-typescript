import { APIGatewayProxyEvent } from "aws-lambda";

export const enum HTTPMethod {
    GET = "GET",
    PUT = "PUT",
    POST = "POST",
    PATCH = "PATCH",
    DELETE = "DELETE"
}

/**
 * 
 * Creates an empty APIGatewayProxyEvent to pass into your tests for Lambda method handlers
 *
 * @export
 * @param {HTTPMethod} [httpMethod=HTTPMethod.GET]
 * @param {string} [path="/"]
 * @param {string} [body=""]
 * @param {APIGatewayProxyEvent['headers']} [headers={}]
 * @returns {APIGatewayProxyEvent}
 */
export function mockEvent(httpMethod :HTTPMethod = HTTPMethod.GET, path: string = "/", body :string = "", headers :APIGatewayProxyEvent['headers'] = {}) :APIGatewayProxyEvent {
    return {
        body,
        path,
        headers,
        multiValueHeaders: {},
        httpMethod,
        isBase64Encoded: false,
        pathParameters: {},
        queryStringParameters: {},
        multiValueQueryStringParameters: {},
        stageVariables: {},

        requestContext: {
            requestTimeEpoch: 0,
            requestId: '',
            resourceId: '',
            resourcePath: path,
            accountId: '',
            apiId: '',
            httpMethod,
            identity: {
                accessKey: null,
                accountId: null,
                apiKey: null,
                apiKeyId: null,
                caller: null,
                cognitoAuthenticationProvider: null,
                cognitoAuthenticationType: null,
                cognitoIdentityId: null,
                cognitoIdentityPoolId: null,
                sourceIp: '',
                user: null,
                userAgent: null,
                userArn: null
            },
            path,
            stage: ''
        },
        resource: ''
    }
}
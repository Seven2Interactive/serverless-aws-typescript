import { PostRequest } from "./Post";

/**
 * Checks to see if a medal is valid
 * @param request
 */


export function hasAllProps(request: PostRequest): boolean {
  const props: string[] = ["data"]; //TODO: List all properties here
  return props.reduce<boolean>(
    (wasValid: boolean, prop: string) =>
      request.hasOwnProperty(prop) && wasValid,
    true
  );
}

export function isRequestValid(request: PostRequest): boolean {
  return (
    hasAllProps(request) &&
    dataIsValid(request.data)
  );
}

export function dataIsValid(initials: string): boolean {
  return true; //TODO: Set validation parameters
}

export function upperCaseString(initials: string): string {
  if (dataIsValid(initials)) {
    return initials.toUpperCase();
  }
  throw "Data is invalid";
}

/**
 * Creates a new PostScoreRequest which strips any properties not matching the PostScoreRequest interface
 * @param request
 */
export function sanitizeRequest(request: PostRequest): PostRequest {
  if (isRequestValid(request)) {
    return {
      ...request,
      data: request.data
    };
  }
  throw "Request was invalid.";
}

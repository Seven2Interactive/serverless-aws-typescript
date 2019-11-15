import { Record } from "./Record";

export interface PostRequest extends Record {
  /** The token provided by the reCaptcha service */
  token?: string;
}

export interface PostResponse {
  success: boolean;
  /** The sanitized record */
  record: Record;
}

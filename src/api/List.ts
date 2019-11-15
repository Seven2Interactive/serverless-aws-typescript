import { Record, RecordID, Timestamp } from "./Record";

export interface ListRequest {}

export type ListResponseRecord = Record & Timestamp & RecordID;

/**
 * The payload from the server
 */
export interface ListResponse {
  success: boolean;
  records: ListResponseRecord[];
}

export interface Error {
  /** The error message */
  err: string;
}

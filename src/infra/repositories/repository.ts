import { ObjectId, Document, Types } from "mongoose";

export interface Repository {
  get(id: Types.ObjectId): Promise<Document>;
  save(document: any): Promise<boolean>;
  list(): Promise<Document[]>;
}

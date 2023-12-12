import { ObjectId, Document } from "mongoose";

export interface Repository {
  get(id: ObjectId): Promise<Document>;
  save(document: any): Promise<boolean>;
  list(): Promise<Document[]>;
}

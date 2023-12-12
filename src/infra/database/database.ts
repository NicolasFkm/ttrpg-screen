import { Model, Schema } from "mongoose";

export interface Database {
  connect(host: string, user: string, password: string): Promise<any>;
  getModel(modelName: string, modelSchema: Schema): typeof Model;
}

import { injectable } from "inversify";
import { Database } from "../database/database";
import mongoose, { Model, Schema } from "mongoose";
import { CharacterRepository } from "../repositories/Character/character";

@injectable()
export class MongoDB implements Database {
  public db: typeof mongoose | undefined;

  async connect(
    host: string,
    user: string,
    password: string
  ): Promise<typeof mongoose> {
    const mongooseDb = await mongoose.connect(
      `mongodb+srv://${user}:${password}@${host}`
    );
    this.db = mongooseDb;
    return mongooseDb;
  }

  getModel(modelName: string, modelSchema: Schema): typeof Model {
    if (!this.db) {
      throw new Error("Database not connected");
    }

    return this.db.model(modelName, modelSchema);
  }
}

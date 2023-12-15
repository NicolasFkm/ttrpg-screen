import { Model, Schema, Document, Types } from "mongoose";
import { Repository } from "../repository";
import { CharacterSchema } from "./characterSchema";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPES } from "../../../domain/types/interfaces";
import { Database } from "../../database/database";

@injectable()
export class CharacterRepository implements Repository {
  private model: Model<any>;

  constructor(@inject(INTERFACE_TYPES.Database) private db: Database) {
    this.model = this.db.getModel("characters", CharacterSchema.getSchema());
  }

  async list(): Promise<Document[]> {
    const result = await this.model.find({ isActive: true }).exec();

    return result as Document[];
  }

  async get(id: Types.ObjectId): Promise<Document> {
    const result = await this.model.findOne({ _id: id }).exec();

    return result as Document;
  }

  async create(document: any): Promise<boolean> {
    const result = await this.model.create(document);

    return result;
  }

  async save(document: any): Promise<boolean> {
    try {
      const result = await this.model
        .findOneAndUpdate({ _id: document._id }, document, { upsert: true })
        .exec();
      return result;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

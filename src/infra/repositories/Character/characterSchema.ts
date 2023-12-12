import { Schema } from "mongoose";
import { ObjectSchema, date, number, object, string } from "yup";

export class CharacterSchema {
  static getSchema(): Schema {
    return new Schema({
      name: "String",
      age: "Number",
      lifePoints: {
        total: "Number",
        current: "Number",
      },
      manaPoints: {
        total: "Number",
        current: "Number",
      },
      defense: {
        total: "Number",
        current: "Number",
      },
      class: {
        name: "String",
        level: "Number",
      },
      altClass: {
        required: false,
        type: {
          name: "String",
          level: "Number",
        },
      },
      isActive: "Boolean",
      createdAt: {
        type: "Date",
        default: new Date(),
      },
      updatedAt: {
        type: "Date",
        default: new Date(),
      },
    });
  }
}

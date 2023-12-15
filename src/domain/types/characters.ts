import { ObjectId } from "mongoose";

export type VariableInformation = {
  total: number;
  current: number;
};

export type Class = {
  name: string;
  level: number;
};

export type Character = {
  _id: ObjectId;
  name: string;
  avatar: string;
  initiative: number;
  age?: number;
  conditions?: string[];
  luckPoints?: number;
  lifePoints: VariableInformation;
  manaPoints: VariableInformation;
  defense: VariableInformation;
  class: Class;
  altClass?: Class;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Stats = {
  lifePoints?: number;
  manaPoints?: number;
  defense?: number;
  luckPoints?: number;
};

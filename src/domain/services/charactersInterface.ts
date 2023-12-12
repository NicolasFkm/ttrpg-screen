import { Character } from "../types/characters";

export interface CharactersServiceInterface {
  getAllCharactersStatus(): Promise<Character[] | null>;
  saveCharacter(info: Character): Promise<Boolean>;
  createCharacter(info: Character): Promise<Character>;
}

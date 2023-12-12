import { CharactersServiceInterface } from "./charactersInterface";
import { CharacterRepository } from "../../infra/repositories/Character/character";
import { Character } from "../types/characters";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPES } from "../types/interfaces";

@injectable()
export class CharactersService implements CharactersServiceInterface {
  constructor(
    @inject(INTERFACE_TYPES.Repository)
    public characterRepository: CharacterRepository
  ) {}

  async getAllCharactersStatus() {
    const characters = await this.characterRepository.list();

    return characters as unknown as Character[];
  }

  async saveCharacter(info: Character) {
    const createdCharacter = await this.characterRepository.save(info);

    return createdCharacter;
  }

  async createCharacter(info: Character): Promise<Character> {
    const createdCharacter = await this.characterRepository.create(info);

    return createdCharacter as unknown as Character;
  }
}

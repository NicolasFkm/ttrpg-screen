import { CharactersServiceInterface } from "./charactersInterface";
import { CharacterRepository } from "../../infra/repositories/Character/character";
import { Character, Stats } from "../types/characters";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPES } from "../types/interfaces";
import { compose, prop, sortBy } from "ramda";
import { Types } from "mongoose";

@injectable()
export class CharactersService implements CharactersServiceInterface {
  constructor(
    @inject(INTERFACE_TYPES.Repository)
    public characterRepository: CharacterRepository
  ) {}

  async getAllCharactersStatus() {
    const list = await this.characterRepository.list();
    const desc = (a: number) => -a;
    const characters = list as unknown as Character[];
    const orderedCharacters = sortBy(
      compose(desc, prop("initiative")),
      characters
    );

    return orderedCharacters;
  }

  async saveCharacter(info: Character) {
    const createdCharacter = await this.characterRepository.save(info);

    return createdCharacter;
  }

  async updateStats(id: string, info: Stats) {
    const currentCharacter = (await this.characterRepository.get(
      new Types.ObjectId(id)
    )) as unknown as Character;

    currentCharacter.manaPoints.current += info.manaPoints ?? 0;
    currentCharacter.lifePoints.current += info.lifePoints ?? 0;

    const createdCharacter = await this.characterRepository.save(
      currentCharacter
    );

    return createdCharacter;
  }

  async createCharacter(info: Character): Promise<Character> {
    const createdCharacter = await this.characterRepository.create(info);

    return createdCharacter as unknown as Character;
  }
}

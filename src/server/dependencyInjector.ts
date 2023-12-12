import { Container } from "inversify";
import { Database } from "../infra/database/database";
import { MongoDB } from "../infra/mongodb";
import { INTERFACE_TYPES } from "../domain/types/interfaces";
import { CharacterRepository } from "../infra/repositories/Character/character";
import { CharactersService } from "../domain/services/characters";
import { CharactersServiceInterface } from "../domain/services/charactersInterface";
import { Repository } from "../infra/repositories/repository";

var container = new Container();
container
  .bind<Database>(INTERFACE_TYPES.Database)
  .to(MongoDB)
  .inSingletonScope();

container.bind<Repository>(INTERFACE_TYPES.Repository).to(CharacterRepository);

container
  .bind<CharactersServiceInterface>(INTERFACE_TYPES.CharactersService)
  .to(CharactersService);

export default container;

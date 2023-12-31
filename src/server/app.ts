import "reflect-metadata";
import express, { Express } from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import PinoHttp from "pino-http";
import cors from "cors";
import expressWs from "express-ws";
import wsRoute from "./routers/wsRouter";
import apiRouter from "./routers/apiRouter";
import { Database } from "../infra/database/database";
import { INTERFACE_TYPES } from "../domain/types/interfaces";
import container from "./dependencyInjector";
import { CharactersService } from "../domain/services/characters";
import logger from "../infra/logger";
import EventEmitter from "events";

class AppServer {
  public app: Express;
  public wsApp: expressWs.Instance;
  constructor(
    private host: string,
    private user: string,
    private password: string,
    public db: Database,
    public eventEmitter: EventEmitter
  ) {
    this.app = express();
    this.wsApp = expressWs(this.app);
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(PinoHttp());
  }

  public resolveDependencies() {
    const charactersService = container.get<CharactersService>(
      INTERFACE_TYPES.CharactersService
    );

    const eventHandler = new EventEmitter();

    return { charactersService, eventHandler };
  }

  public start(port: number) {
    this.app.listen(port, async () => {
      logger.info({}, `Running on ${port}`);
      await this.db.connect(this.host, this.user, this.password);

      const { charactersService, eventHandler } = this.resolveDependencies();
      this.app.use("/api/v1", apiRouter(charactersService, eventHandler));
      wsRoute(this.wsApp, charactersService, eventHandler);
      logger.info({}, "Database connected");
    });
  }
}

export default AppServer;

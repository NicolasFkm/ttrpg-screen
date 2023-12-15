import { NextFunction, Request } from "express";
import { Instance } from "express-ws";
import { WebSocket } from "ws";
import { CharactersService } from "../../domain/services/characters";
import logger from "../../infra/logger";
import EventEmitter from "events";

const wsRoute = (
  expressWs: Instance,
  charactersService: CharactersService,
  eventHandler: EventEmitter
) => {
  expressWs.app.ws(
    "/ws/v1/characters",
    async (ws: WebSocket, req: Request, next: NextFunction) => {
      logger.info({}, "Socket Connected");

      eventHandler.on("handout", (image: Buffer) => {
        ws.send(image);
      });

      ws.on("message", async (message, ...args) => {
        const characters = await charactersService.getAllCharactersStatus();
        ws.send(JSON.stringify(characters));
      });

      const job = setInterval(async () => {
        const characters = await charactersService.getAllCharactersStatus();
        ws.send(JSON.stringify(characters));
      }, 5000);

      ws.on("close", (code, ...args) => {
        clearInterval(job);
        logger.info({ code, args }, "Closed Connection");
      });
    }
  );
};

export default wsRoute;

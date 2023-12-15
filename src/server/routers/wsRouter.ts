import { NextFunction, Request } from "express";
import { Instance } from "express-ws";
import { WebSocket } from "ws";
import { CharactersService } from "../../domain/services/characters";
import { compose, descend, prop, sortBy, sortWith } from "ramda";
import logger from "../../infra/logger";

const wsRoute = (expressWs: Instance, charactersService: CharactersService) => {
  expressWs.app.ws(
    "/ws/v1/characters",
    async (ws: WebSocket, req: Request, next: NextFunction) => {
      logger.info({}, "Socket Connected");

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

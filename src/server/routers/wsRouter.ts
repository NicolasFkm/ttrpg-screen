import { NextFunction, Request } from "express";
import { Instance } from "express-ws";
import { WebSocket } from "ws";
import { CharactersService } from "../../domain/services/characters";

const wsRoute = (expressWs: Instance, charactersService: CharactersService) => {
  expressWs.app.ws(
    "/ws/v1/characters",
    async (ws: WebSocket, req: Request, next: NextFunction) => {
      console.log("Connected", ws.readyState);
      ws.on("upgrade", (...args) => {
        console.log("upgraded", args);
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
        console.log("Closed Connection", code, args);
      });
    }
  );
};

export default wsRoute;

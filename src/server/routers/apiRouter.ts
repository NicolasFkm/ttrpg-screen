import { Request, Response, Router } from "express";
import { CharactersService } from "../../domain/services/characters";
import { Types } from "mongoose";
import Multer from "multer";
import EventEmitter from "events";
const STORAGE = Multer.memoryStorage();
const UPLOAD = Multer({ storage: STORAGE });

const apiRouter = (
  charactersService: CharactersService,
  eventHandler: EventEmitter
): Router => {
  const router = Router();

  router.get("/", (req: Request, res: Response) => {
    return res.sendStatus(201);
  });

  router.post(
    "/handouts",
    UPLOAD.single("file"),
    async (req: Request, res: Response) => {
      const image = req?.file?.buffer.toString("base64");
      if (req?.file?.buffer.buffer) {
        eventHandler.emit("handout", Buffer.from(req?.file?.buffer.buffer));
      }

      return res.status(201).json({ image });
    }
  );

  router.get("/characters", async (req: Request, res: Response) => {
    const characters = await charactersService.getAllCharactersStatus();

    res.status(200).json({
      data: {
        characters,
      },
    });
  });

  router.post("/characters", async (req: Request, res: Response) => {
    const createdCharacter = await charactersService.createCharacter(
      req.body.character
    );
    res.status(200).json({
      data: {
        id: createdCharacter._id,
      },
    });
  });

  router.put("/characters/:id", async (req: Request, res: Response) => {
    const id = req.params.id;

    const updatedCharacter = await charactersService.saveCharacter({
      _id: new Types.ObjectId(id),
      ...req.body.character,
    });
    res.status(200).json({
      data: {
        id: updatedCharacter,
      },
    });
  });

  router.put("/characters/:id/stats", async (req: Request, res: Response) => {
    const id = req.params.id;
    const stats = req.body.stats;

    const updatedCharacter = await charactersService.updateStats(id, stats);
    res.status(200).json({
      data: {
        id: updatedCharacter,
      },
    });
  });

  return router;
};

export default apiRouter;

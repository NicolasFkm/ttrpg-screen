import "reflect-metadata";
import "dotenv/config";
import AppServer from "./server/app";

import container from "./server/dependencyInjector";
import { INTERFACE_TYPES } from "./domain/types/interfaces";
import { Database } from "./infra/database/database";

const PORT = Number(process.env.PORT) || 3000;
const DB_USERNAME = process.env.DB_USERNAME || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_HOST = process.env.DB_HOST || "";

const mongoDb = container.get<Database>(INTERFACE_TYPES.Database);
const app = new AppServer(DB_HOST, DB_USERNAME, DB_PASSWORD, mongoDb);
app.start(PORT);

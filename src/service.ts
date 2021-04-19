import "reflect-metadata";
import {Express} from "express";
import container from "./inversify.config";
import {TYPES} from "./inversify.types";

const app = container.get<Express>(TYPES.App);
app.listen(3000, () => "service listening on port 3000");

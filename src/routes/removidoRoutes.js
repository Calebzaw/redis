import express from "express";
import removido from "../controllers/removido.js";
const routes = express.Router();

routes.get("/", removido.findAll);
routes.get("/:id", removido.findOne);

export { routes as default };

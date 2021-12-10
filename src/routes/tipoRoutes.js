import express from "express";
import tipo from "../controllers/tipo.js";
const routes = express.Router();

routes.get("/", tipo.findAll);
routes.get("/:id", tipo.findOne);
routes.post("/", tipo.addOne);
routes.put("/:id", tipo.updateOne);
routes.delete("/:id", tipo.deleteOne);

export { routes as default };

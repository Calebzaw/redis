import express from "express";
import comanda from "../controllers/comanda.js";
const routes = express.Router();

routes.get("/", comanda.findAll);
routes.get("/:id", comanda.findOne);
routes.post("/", comanda.addOne);
routes.put("/:id", comanda.updateOne);
routes.delete("/:id", comanda.deleteOne);

export { routes as default };

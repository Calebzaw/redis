import express from "express";
import tppag from "../controllers/tppagamento.js";
const routes = express.Router();

routes.get("/", tppag.findAll);
routes.get("/:id", tppag.findOne);
routes.post("/", tppag.addOne);
routes.put("/:id", tppag.updateOne);
routes.delete("/:id", tppag.deleteOne);

export { routes as default };

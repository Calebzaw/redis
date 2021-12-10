import express from "express";
import produto from "../controllers/produto.js";
const routes = express.Router();

routes.get("/", produto.findAll);
routes.get("/:id", produto.findOne);
routes.post("/", produto.addOne);
routes.put("/:id", produto.updateOne);
routes.delete("/:id", produto.deleteOne);


export { routes as default };

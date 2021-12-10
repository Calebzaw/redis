import express from "express";
import item from "../controllers/item.js";
const routes = express.Router();

routes.get("/", item.findAll);
routes.get("/:id", item.findOne);
routes.post("/", item.addOne);
routes.put("/:id", item.updateOne);
routes.delete("/:id", item.deleteOne);

export { routes as default };

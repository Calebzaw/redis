import express from "express";
import garcom from "../controllers/garcom.js";
const routes = express.Router();

routes.get("/", garcom.findAll);
routes.get("/:id", garcom.findOne);
routes.post("/", garcom.addOne);
routes.put("/:id", garcom.updateOne);
routes.delete("/:id", garcom.deleteOne);

export { routes as default };

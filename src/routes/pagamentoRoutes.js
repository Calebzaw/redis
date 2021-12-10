import express from "express";
import pagamento from "../controllers/pagamento.js";
const routes = express.Router();

routes.get("/", pagamento.findAll);
routes.get("/:id", pagamento.findOne);
routes.post("/", pagamento.addOne);
routes.put("/:id", pagamento.updateOne);
routes.delete("/:id", pagamento.deleteOne);

export { routes as default };

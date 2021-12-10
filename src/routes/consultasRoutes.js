import express from "express";
import consulta from "../controllers/consultas.js";
const routes = express.Router();

routes.get("/1", consulta.query1);
routes.get("/2/:id", consulta.query2);
routes.get("/3", consulta.query3);
routes.get("/4/:id", consulta.query4);
routes.get("/5/:id", consulta.query5);
routes.get("/6/:id", consulta.query6);
routes.get("/7", consulta.query7);
routes.get("/8", consulta.query8);
routes.get("/9", consulta.query9);
routes.get("/10", consulta.query10);
routes.get("/11", consulta.query11);
routes.get("/12", consulta.query12);
routes.get("/13", consulta.query13);
routes.get("/14", consulta.query14);
routes.get("/15", consulta.query15);
routes.get("/16", consulta.query16);
routes.get("/17/:id", consulta.query17);
routes.get("/18", consulta.query18);
routes.get("/19/:id", consulta.query19);
routes.get("/20", consulta.query20);
routes.get("/21", consulta.query21);
routes.get("/22", consulta.query22);

export { routes as default };

import express, { Router } from "express";
import auth from '../Middleware/autenticador.js';
import autenticacao from '../controllers/autenticacao.js'
const routes = express.Router();

routes.post("/login", autenticacao);

routes.use(auth);

routes.get('/perfil', (req, res)=>{
    res.json(req.session);
})

export { routes as default };

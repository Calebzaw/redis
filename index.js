import express from "express";
import dotenv from 'dotenv';
import auth from './src/routes/autenticacao.js';
import comanda from "./src/routes/comandaRoutes.js";
import garcom from "./src/routes/garcomRoutes.js";
import item from "./src/routes/itemRoutes.js";
import pagamento from "./src/routes/pagamentoRoutes.js";
import produto from "./src/routes/produtoRoutes.js";
import removido from "./src/routes/removidoRoutes.js";
import tipo from "./src/routes/tipoRoutes.js";
import tppag from "./src/routes/tppagRoutes.js";
import consultas from "./src/routes/consultasRoutes.js";
import db from "./src/Banco/db.js";
import sessao from './src/Middleware/sessao.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('./public'));

//app.set('trust proxy', 1); // Aceita proxys
app.use(sessao);

app.use(auth)

app.use('/comanda', comanda);
app.use('/tipo', tipo);
app.use('/garcom', garcom);
app.use('/item', item);
app.use('/pagamento', pagamento);
app.use('/produto', produto);
app.use('/removido', removido);
app.use('/tppag', tppag);
app.use('/consultas', consultas);

app.use((req, res)=>{
    res.status(404).send(`Página não encontrada`)
})

db.authenticate();
app.listen(3000, () => console.log("Servidor iniciado na porta 3000"));

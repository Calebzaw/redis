import produto from "../models/produtoModel.js";

function findAll(req, res) {
    produto.findAll({
        order: ['idproduto'],
    }).then((result) => res.json(result));
  }
  
function findOne(req, res) {
    produto.findByPk(req.params.id).then((result) => res.json(result));
}

function addOne(req, res) {
    produto.create({
        idtipo: req.body.idtipo,
        vlproduto: req.body.vlproduto,
        dsproduto: req.body.dsproduto,
        flsituacao: req.body.flsituacao,
    }).then((result) => res.json(result)).catch((err)=>{
        res.status(400).send(err.errors[0].message)});
}

async function updateOne(req, res) {
    await produto.update(
        {
            idtipo: req.body.idtipo,
            vlproduto: req.body.vlproduto,
            dsproduto: req.body.dsproduto,
            flsituacao: req.body.flsituacao,
        },
        {
            where: {
                idproduto: req.params.id,
            },
        }
);

    produto.findByPk(req.params.id).then((result) => res.json(result)).catch((err)=>{
        res.status(400).send(err.errors[0].message)});
}

async function deleteOne(req, res) {
    await produto.destroy({
        where: {
        idproduto: req.params.id,
    },
});

    produto.findAll({order:['idproduto']}).then((result) => res.json(result)).catch((err)=>{
        res.status(400).send(err.errors[0].message)});
}

export default { findAll, findOne, addOne, updateOne, deleteOne };

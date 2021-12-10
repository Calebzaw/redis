import item from "../models/itemModel.js";

function findAll(req, res) {
    item.findAll({
        order: ['iditem'],
    }).then((result) => res.json(result));
  }
  
function findOne(req, res) {
    item.findByPk(req.params.id).then((result) => res.json(result));
}

function addOne(req, res) {
        item.create({
        idcomanda: req.body.idcomanda,
        idproduto: req.body.idproduto,
    }).then((result) => res.json(result)).catch((err)=>{
        res.status(400).send(err.errors[0].message)});
}

async function updateOne(req, res) {
    await item.update(
        {
            idcomanda: req.body.idcomanda,
            idproduto: req.body.idproduto,
        },
        {
            where: {
                iditem: req.params.id,
            },
        }
);

    item.findByPk(req.params.id).then((result) => res.json(result)).catch((err)=>{
        res.status(400).send(err.errors[0].message)});
}

async function deleteOne(req, res) {
    await item.destroy({
        where: {
        iditem: req.params.id,
    },
});

    item.findAll({order:['iditem']}).then((result) => res.json(result)).catch((err)=>{
        res.status(400).send(err.errors[0].message)});
}

export default { findAll, findOne, addOne, updateOne, deleteOne };
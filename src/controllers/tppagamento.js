import idtppag from "../models/tppagamentoModel.js";

function findAll(req, res) {
    idtppag.findAll({
        order: ['idtppag'],
    }).then((result) => res.json(result));
  }

function findOne(req, res) {
  idtppag.findByPk(req.params.id).then((result) => res.json(result));
}
  
function addOne(req, res) {
  idtppag.create({
        dstppag: req.body.dstppag,
    }).then((result) => res.json(result)).catch((err)=>{
      res.status(400).send(err.errors[0].message)});
}
  
async function updateOne(req, res) {
  await idtppag.update(
    {
      dstppag: req.body.dstppag,
    },
    {
      where: {
        idtppag: req.params.id,
      },
    }
  );

  idtppag.findByPk(req.params.id).then((result) => res.json(result)).catch((err)=>{
    res.status(400).send(err.errors[0].message)});
}
  
async function deleteOne(req, res) {
  await idtppag.destroy({
    where: {
      idtppag: req.params.id,
    },
  });

  idtppag.findAll({order:['idtppag']}).then((result) => res.json(result)).catch((err)=>{
    res.status(400).send(err.errors[0].message)});
}

export default { findAll, findOne, addOne, updateOne, deleteOne };
  

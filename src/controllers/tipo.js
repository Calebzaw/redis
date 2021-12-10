import tipo from "../models/tipoModel.js";

function findAll(req, res) {
    tipo.findAll({
        order: ['idtipo'],
    }).then((result) => res.json(result));
  }
  
function findOne(req, res) {
  tipo.findByPk(req.params.id).then((result) => res.json(result));
}
  
function addOne(req, res) {
  tipo.create({
        nmtipo: req.body.nmtipo,
        flsituacao: req.body.flsituacao
    }).then((result) => res.json(result)).catch((err)=>{
      res.status(400).send(err.errors[0].message)});
}
  
async function updateOne(req, res) {
  await tipo.update(
    {
      nmtipo: req.body.nmtipo,
      flsituacao: req.body.flsituacao,
    },
    {
      where: {
        idtipo: req.params.id,
      },
    }
  );

  tipo.findByPk(req.params.id).then((result) => res.json(result)).catch((err)=>{
    res.status(400).send(err.errors[0].message)});
}
  
async function deleteOne(req, res) {
  await tipo.destroy({
    where: {
      idtipo: req.params.id,
    },
  });

  tipo.findAll({order:['idtipo']}).then((result) => res.json(result)).catch((err)=>{
    res.status(400).send(err.errors[0].message)});
}

export default { findAll, findOne, addOne, updateOne, deleteOne };

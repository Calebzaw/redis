import garcom from "../models/garcomModel.js";

function findAll(req, res) {
    garcom.findAll({
        order: ['idgarcom'],
    }).then((result) => res.json(result));
  }

function findOne(req, res) {
  garcom.findByPk(req.params.id).then((result) => res.json(result));
}

function addOne(req, res) {
  garcom.create({
        idgarcom: req.body.idgarcom,
        nmgarcom: req.body.nmgarcom
    }).then((result) => res.json(result)).catch((err)=>{
      res.status(400).send(err.errors[0].message)});
}
  
async function updateOne(req, res) {
  await garcom.update(
    {
        nmgarcom: req.body.nmgarcom
    },
    {
      where: {
        idgarcom: req.params.id,
      },
    }
  );

  garcom.findByPk(req.params.id).then((result) => res.json(result)).catch((err)=>{
    res.status(400).send(err.errors[0].message)});
}
  
async function deleteOne(req, res) {
  await garcom.destroy({
    where: {
      idgarcom: req.params.id,
    },
  });

  garcom.findAll({order:['idgarcom']}).then((result) => res.json(result)).catch((err)=>{
    res.status(400).send(err.errors[0].message)});
}

export default { findAll, findOne, addOne, updateOne, deleteOne };


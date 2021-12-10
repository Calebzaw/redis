import removido from "../models/removidoModel.js";

function findAll(req, res) {
    removido.findAll({
        order: ['idremovido'],
    }).then((result) => res.json(result));
  }
  
function findOne(req, res) {
    removido.findByPk(req.params.id).then((result) => res.json(result));
}

export default { findAll, findOne };

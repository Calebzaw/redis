import comanda from "../models/comandaModel.js";
import garcom from "../models/garcomModel.js";
import tipo from "../models/tipoModel.js";
import item from "../models/itemModel.js";
import produto from "../models/produtoModel.js";
import sequelize, { Sequelize } from 'sequelize';

const Op = sequelize.Op;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbHost = process.env.DB_HOST;
const dbPassword = process.env.DB_PASSWORD;

const sql = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "postgres",
  host: dbHost,
});

tipo.hasMany(produto, {
    foreignKey: 'idtipo'
});
produto.belongsTo(tipo, {
    foreignKey: 'idtipo'
});

garcom.hasMany(comanda, {
    foreignKey: 'idgarcom'
});
comanda.belongsTo(garcom, {
    foreignKey: 'idgarcom'
});

produto.hasMany(item, {
    foreignKey: 'idproduto'
});
item.belongsTo(produto, {
    foreignKey: 'idproduto'
});

comanda.hasMany(item, {
    foreignKey: 'idcomanda'
});
item.belongsTo(comanda, {
    foreignKey: 'idcomanda'
});

function query1(req, res){
    produto.findAll({
        raw:true,
        attributes: ['vlproduto', 'dsproduto'],
        order: [[sequelize.literal('tipo.nmtipo')]],
        where: {
            flsituacao: 1,
        },
        include: [{
            model: tipo,
            attributes: ['nmtipo'],
            where: {
                flsituacao: 1,
            },
        }] 
    }).then((result) => res.json(result)).catch((err)=>{
        res.status(400).send(err)});
}

function query2(req, res){
    produto.findAll({
        raw:true,
        order: ['vlproduto'],
        attributes: ['vlproduto', 'dsproduto'],
        where: {
            flsituacao: 1,
            idtipo: req.params.id
        },
        include: [{
            model: tipo,
            attributes: ['nmtipo']}] 
    }).then((result) => res.json(result)).catch((err)=>{
        res.status(400).send(err)});
}

function query3(req, res){
    comanda.findAll({
        raw:true,
        order: ['dhcomanda'],
        attributes: ['idcomanda', 'dhcomanda', 'flcomanda'],
        include: [{
            model: garcom,
            attributes: ['nmgarcom']}] 
    }).then((result) => {
        res.json(result)
    }).catch((err)=>{
        res.status(400).send(err)});
}

function query4(req, res){
    item.findAll({
        raw:true,
        attributes: ['vlvenda'],
        where: {
            idcomanda: req.params.id
        },
        include: [{
            model: produto,
            attributes: ['dsproduto']}] 
    }).then((result) => {
        res.json(result)
    }).catch((err)=>{
        res.status(400).send(err)});
}

// function query5(req, res){
//     sql.query(`select   COUNT(item.iditem)
// 	            from item
//                 where item.idcomanda = :idcomanda`,{
//         raw:true,
//         replacements: {
//             idcomanda: [req.params.id],
//         }
//     }).then((result) => {
//         res.json(result)
//     }).catch((err)=>{
//         res.status(400).send(err)});
// }

function query5(req, res){
    item.findAll({
        raw:true,
        attributes: [sequelize.literal('count(iditem)')],//[[sequelize.fn('COUNT', sequelize.col('iditem')), 'id']],
        where: {
            idcomanda: req.params.id
        },
    }).then((result) => {
        res.json(result)
    }).catch((err)=>{
        res.status(400).send(err)});
}

function query6(req, res){
    item.findAll({
        raw: true,
        attributes: [sequelize.literal('sum((item.vlvenda)-comanda.desconto)')],//[[sequelize.fn("sum", sequelize.literal("(item.vlvenda)-comanda.desconto")), 'valor']],
        group: [sequelize.literal("comanda.desconto")],
        where:{
            idcomanda: req.params.id
        },
        include:[{
            model: comanda,
            attributes: []
        }]
    }).then((result) => {
        res.json(result)
    }).catch((err)=>{
        res.status(400).send(err)});
}

function query7(req, res){
    garcom.findAll({
        raw: true,
        group: ['nmgarcom'],
        attributes: ['nmgarcom'],
        order:[[sequelize.fn('COUNT', sequelize.col('idcomanda')), 'desc']],
        include: [{
            model: comanda,
            duplicating: false,
            attributes: [[sequelize.fn('COUNT', sequelize.col('idcomanda')), 'vendas']],
        }]
    }).then((result) => {
        res.json(result)
    }).catch((err)=>{
        res.status(400).send(err)});
}

function query8(req, res){
    comanda.findAll({
        raw: true,
        attributes: ['idcomanda'],
        group: [sequelize.literal("comanda.idcomanda"), sequelize.literal("garcom.nmgarcom")],
        order: [sequelize.literal("comanda.idcomanda")],
        where: {
            flcomanda: 0
        },
        include: [{
            model: garcom,
            required: true,
            attributes: ['nmgarcom']
        },{
            model: item,
            duplicating: false,
            required: false,
            attributes: [[sequelize.fn('COUNT', sequelize.col('iditem')), 'id'],
             [sequelize.fn('coalesce', sequelize.fn("sum", sequelize.col('vlvenda')), sequelize.literal('0')), 'valor']],
        }]
    }).then(result =>
        res.json(result)
    ).catch(err =>
        res.status(400).send(err)
    );
}

function query9(req, res){
    comanda.findAll({
        raw:true,
        attributes:['idcomanda'],
        order: ['idcomanda'],
        where:{
            flcomanda: 1,
            dhcomanda:{
                [Op.gte]: req.body.initdate,
                [Op.lte]: req.body.enddate
            }
        },
        include: [{
            model: garcom,
            attributes: ['nmgarcom'],
        }]
    }).then(result=>{
        res.json(result);
    }).catch(err=>{
        res.status(400).send(err);
    });
}

function query10(req, res){
    comanda.findAll({
        raw:true,
        attributes:['idcomanda', 'dhcomanda'],
        order: ['idcomanda'],
        where:{
            flcomanda: 1,
            idcomanda:{[Op.notIn]: [sequelize.literal('select item.idcomanda from item')]}
        },
    }).then(result=>{
        res.json(result);
    }).catch(err=>{
        res.status(400).send(err);
    });
}

function query11(req,res){
    item.findAll({
        raw: true,
        limit: 3,
        attributes: [[sequelize.fn('COUNT', sequelize.col('item.idproduto')), 'quantia']],
        order: [[sequelize.fn('COUNT', sequelize.col('item.idproduto')), 'DESC']],
        group: ['dsproduto'],
        where: {
            idcomanda:{
                [Op.in]: [sequelize.literal(`select comanda.idcomanda 
                                                from comanda 
                                                where item.idcomanda = comanda.idcomanda 
                                                and comanda.dhcomanda between '${req.body.initdate}' 
                                                and '${req.body.enddate}'`)]
            }
        },
        include: [{
            model: produto,
            duplicating: false,
            attributes: ['dsproduto'],
        }]
    }).then(result=>{
        res.json(result)
    }).catch(err=>{
        res.status(400).send(err)
    });
}

function query12(req, res) {
    sql.query(`WITH cte_periodo as (
        select sum(coalesce(item.vlvenda,0))-avg(comanda.desconto) as valor,
               comanda.dhcomanda::time as data
          from item
          join comanda
            on item.idcomanda = comanda.idcomanda
         where DATE(comanda.dhcomanda) = ?
      group by comanda.idcomanda 
    )  
    select coalesce((select sum(cte_periodo.valor)
                       from cte_periodo
                         where cte_periodo.data between '07:00:00' and '12:00:00'),0) as manhã,
           coalesce((select sum(cte_periodo.valor)
                       from cte_periodo
                         where cte_periodo.data between '12:00:01' and '18:00:00'),0) as tarde,
           coalesce((select sum(cte_periodo.valor)
                       from cte_periodo
                         where cte_periodo.data between '18:00:01' and '23:00:00'),0) as noite `,
    {
        raw: true,
        replacements: [req.body.date]
    }).then(result=>{
        res.json(result)
    }).catch(err=>{
        res.status(400).send(err);
    });
}

function query13(req,res){
    item.findAll({
        raw:true,
        attributes:['vlvenda'],
        order:[[sequelize.literal("comanda.idcomanda")]],
        include: [{
            model:produto,
            attributes:['dsproduto'],
        },{
            model:comanda,
            attributes:['idcomanda'],
            where: {
                idcomanda: {
                    [Op.in]: [sequelize.literal(req.body.ids)]
                }
            }
        }]
    }).then(result=>res.json(result)).catch(err=>res.status(400).send(err))
}

function query14(req,res){
    produto.findAll({
        raw:true,
        attributes: ['dsproduto'],
        order:[sequelize.literal('tipo.nmtipo')],
        group: [[sequelize.literal('tipo.nmtipo')], 'dsproduto'],
        where:{
            flsituacao: 1,
            idproduto:{
                [Op.notIn]: [sequelize.literal(`select produto.idproduto
                from produto 
                join item
                  on item.idproduto = produto.idproduto 
                join comanda
                  on comanda.idcomanda = item.idcomanda
               where comanda.dhcomanda >= '${req.body.initdate}'
                 and comanda.dhcomanda < '${req.body.enddate}'`)]
            }
        },
        include:[{
            model:tipo,
            attributes:['nmtipo'],
            where:{
                flsituacao: 1
            }
        }]
    }).then(result=>res.json(result)).catch(err=>res.status(400).send(err))
}

function query15(req, res){
    garcom.findAll({
        raw:true,
        attributes:['nmgarcom'],
        where:{
            idgarcom: {
                [Op.notIn]: [sequelize.literal(`select idgarcom 
                from comanda
               where cast(comanda.dhcomanda as date) = '${req.body.date}'`)]
            }
        },
    }).then(result=>res.json(result)).catch(err=>res.status(400).send(err));
}

function query16(req,res){
    item.findAll({
        raw:true,
        attributes:[[sequelize.fn("COUNT", sequelize.col('item.idproduto')), 'quantia']],
        order:[[sequelize.fn("COUNT", sequelize.col('item.idproduto')), 'desc']],
        group:['produto.dsproduto'],
        include:[{
            model:produto,
            attributes:['dsproduto'],
            where:{
                flsituacao: 1
            },
            include:[{
                model: tipo,
                attributes: [],
                where:{
                    flsituacao:1
                }
            }]
        }]
    }).then(result=>res.json(result)).catch(err=>res.status(400).send(err));
}

function query17(req,res){
    produto.findAll({
        raw:true,
        attributes:['dsproduto'],
        group:['dsproduto'],
        include:[{
            model:item,
            attributes: [],
            required: true,
            include:[{
                model:comanda,
                required: true,
                attributes:[],
                where:{
                    idgarcom: req.params.id
                } 
            }]
        }]
    }).then(result=>res.json(result)).catch(err=>res.status(400).send(err));
}

function query18(req, res){
    produto.findAll({
        raw:true,
        attributes: ['dsproduto'],
        where:{
            idproduto:{
                [Op.notIn]: [sequelize.literal(`select item.idproduto from item`)]
            }
        }
    }).then(result=>res.json(result)).catch(err=>res.status(400).send(err))
}

function query19(req, res){
    produto.findAll({
        raw:true,
        attributes: ['dsproduto'],
        where:{
            idtipo: req.params.id,
            idproduto:{
                [Op.notIn]: [sequelize.literal(`select produto.idproduto 
                from produto
                join item
                  on produto.idproduto = item.idproduto
                join comanda
                  on comanda.idcomanda = item.iditem
               where comanda.dhcomanda >= '${req.body.initdate}'
                 and comanda.dhcomanda <= '${req.body.enddate}'`)]
            }
        }
    }).then(result=>res.json(result)).catch(err=>res.status(400).send(err))
}

function query20(req,res){
    item.findAll({
        raw:true,
        attributes:[[sequelize.fn("AVG", sequelize.col('vlvenda')), 'media']],
        group:[sequelize.literal("comanda.idcomanda")],
        order:[sequelize.literal("comanda.idcomanda")],
        include:[{
            model:comanda,
            attributes:['idcomanda'],
            duplicating: false,
            where:{
                dhcomanda:{
                    [Op.gte]: req.body.initdate,
                    [Op.lte]: req.body.enddate
                }
            },
        }]
    }).then(result=>res.json(result)).catch(err=>res.status(400).send(err))
}

function query21(req,res){
    item.findAll({
        raw:true,
        attributes: [[sequelize.fn("SUM", sequelize.col("vlvenda")),"venda"]],
        group:[sequelize.literal("produto.dsproduto")],
        include:[{
            model:produto,
            attributes: ['dsproduto'],
            duplicating:false
        }]
    }).then(result=>res.json(result)).catch(err=>res.status(400).send(err))
}

function query22(req, res){
    item.sequelize.transaction(async () => {
        await item.bulkCreate([{
            idcomanda: 3,
            idproduto: 1,
        },{
            idcomanda: 81,
            idproduto: 900,
        }])
    }).then(result=>res.json(result)).catch(err=>res.send(err))
}

export default { query1, query2, query3, query4, query5, query6, query7, query8, query9, query10,
                 query11, query12, query13, query14, query15, query16, query17, query18, query19,
                 query20, query21, query22 };
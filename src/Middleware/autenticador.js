export default function autenticador(req, res, next){
    if(!req.session || !req.session.clientID){
        const err = new Error('Você não está autorizado a realizar essa operação.');
        err.statusCode = 401,
        next(err);
    }
    next();
}

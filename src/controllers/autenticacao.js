export default function login(req, res){
    const {email, senha} = req.body;

    //Sistema de verificação
    if(!email || !senha){
        return res.status(400).json("Usuário ou Senha inválidos.")
    }

    //Assumindo que passou
    req.session.clientID = 'abc123';
    req.session.myNumber = 5;

    res.json('Você está logado.');
}
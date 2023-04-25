const { isValidObjectId } = require("mongoose")
const { schemaOeuvreJoi } = require("./verif/verif")
const JWT = require("jsonwebtoken")

function idValid(request, reponse, next){
    const id =request.params.id ;
    if(!isValidObjectId(id)) return reponse.status(400).json({msg : `l'id ${id} n'est pas valide`, where : "middleware"})
    next();
}
function isValidOeuvre (request, reponse, next ){
    const { body } =request;
    const { error } =schemaOeuvreJoi.validate(body, { abortEarly : false})
    if(error) return reponse.status(400).json(error.details)
    next()
};
function autorisation(request , reponse, next){
    const token = request.header("x-token")
    if(!token) return reponse.status(401).json({msg : "il manque le token"})
    try{
        const payload = JWT.verify(token , process.env.CLE_PRIVEE_JWT)
        request.user = payload 
    next();
}
catch(ex){
    reponse.status(400).json({msg : "token invalide"})
    }
}

function isAdmin(request, reponse, next ){
    if(request.user.role !=="admin") return reponse.status(403).json({msg : "seul l'administrateur peut effectuer cette modification"})
    next()
}


module.exports.idValid = idValid
module.exports.isValidOeuvre = isValidOeuvre
module.exports.autorisation = autorisation
module.exports.isAdmin = isAdmin
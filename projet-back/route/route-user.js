const { Router, reponse } = require("express")
const { User } = require("../model/model")
const { schemaJoiUser } = require("../verif/verif");
const { genSalt, hash } = require("bcrypt");

const { isValidObjectId } = require("mongoose")

const route = Router();

route.post("/", async(request, reponse)=>{
    const { body } = request;

    const { error } =schemaJoiUser.validate(body, { abortEarly : false})
    if(error) return reponse.status(400).json(error.details)

    const userRecherche = await User.find({email : body.email}) 
    if(userRecherche.length > 0) return reponse.status(400).json({ msg : "cette adresse email est déjà utilisée"})
    const salt = await genSalt(6)
    const passwordHashe = await hash(body.password , salt)

    const userNouveau = new User ({...body , password : passwordHashe})
    await userNouveau.save()

    return reponse.json({msg : "profil user créé"})
})

route.get("/all", async(request, reponse)=>{
    const allUsers = await User.find({}).select({_id : 1 , email : 1, role : 1, password : 1}) 
    reponse.json(allUsers)
})

route.delete("/:id", async(request, reponse)=>{
    const id = request.params.id ;
    if(!isValidObjectId(id)) return reponse.status(400).json({msg : `${id} invalide`})

    const userASupprimer = await User.findByIdAndRemove(id)
    if(!userASupprimer) return reponse.status(404).json({msg : `user supprimé ${id} `})

    reponse.json({msg : `user ${id} est bien supprimé ` })
})




module.exports = route;
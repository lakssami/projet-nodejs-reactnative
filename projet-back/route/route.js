const { Router } = require("express");
const { Oeuvre } = require("../model/model");
const { autorisation, idValid, isAdmin, isValidOeuvre } = require("../middleware");

const route = Router();

route.get("/", idValid, (request, reponse)=>{
   return reponse.json({msg : "les oeuvres"})
})

route.post("/", [autorisation, isValidOeuvre], async (request, reponse)=>{
    const {body} = request
    const dt_creation = new Date();
    const newOeuvre = new Oeuvre ({ ... body, dt_creation : dt_creation})
    await newOeuvre.save()
    return reponse.json(newOeuvre);
})

route.get("/all", async (request, reponse)=>{
    const{body}=request
    const tousLesOeuvres = await Oeuvre.find().populate()
    return reponse.json(tousLesOeuvres)
})

route.put("/:id",[ idValid, isValidOeuvre ], async(request, reponse)=>{
    const id = request.params.id ;
    const {body}=request;
    const oeuvreUpdated = await Oeuvre.findByIdAndUpdate(id,{ $set : body} , { new : true } )
    return reponse.json(oeuvreUpdated)
} )

route.delete("/:id", [ /*autorisation, isAdmin,*/ idValid ], async(request, reponse)=>{
    const id =request.params.id
    const deleteOeuvre = await Oeuvre.findByIdAndRemove(id)
    return reponse.json(deleteOeuvre)
})
route.get("/:id", idValid , async (request , reponse) => {
    const id = request.params.id ;
    const oeuvreRecherche = await Oeuvre.findById(id)

    if(!oeuvreRecherche) return reponse.status(404).json({ msg : `l'oeuvre ${id} n'existe pas` })

    reponse.json(oeuvreRecherche);
})


module.exports = route
const { Schema, model, Types } = require("mongoose")

const oeuvreSchema = new Schema({
    nom : {type : String , required : true},
    description : {type : String , required : true},
    image : {type : String , default : "https://source.unsplash.com/random/400x200" },
    auteur : { type : String, ref : "users" , required : false },
    dt_creation :{type : Date , required : true}
})

const Oeuvre = model("oeuvres" , oeuvreSchema);

const userSchema = new Schema({
    email : String ,  
    password : String ,
    role : { type : String , enum : ['redacteur' , 'admin'] }
})

const User = model("utilisateurs" , userSchema);

module.exports.Oeuvre = Oeuvre ;
module.exports.User = User ;


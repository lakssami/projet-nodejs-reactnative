import {  useState, useEffect, createContext } from "react"
import * as SQLITE from "expo-sqlite"


export const ProfilContext = createContext()

export function ProfilContextProvider(props){
let db ; 

useEffect(function(){
    db = openDB();
    verificationSQL(db);
    console.log("connecté sql");
},[]);

useEffect(function(){
    
},[])
  const verificationSQL = function(db){
    db.transaction(function(tx){
      tx.executeSql(`CREATE TABLE IF NOT EXISTS jwt (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    token VARCHAR(255)
                  )`,
                    [],
                    function(transact, resultat){ console.log("table oeuvre créé") },
                    function(transact , err){ console.log(err) })
    })
    
  };

    
    function openDB(){
        if(Platform.OS === "web"){
          return {
            transaction : () => {
              return {
                executeSql : () => {} 
              }
            }
          }
        }
        return SQLITE.openDatabase("demo.sqlite");
      }

    useEffect(function(){
      if (jwt == "") return 
      db.transaction(function(tx){
        tx.executeSql(`INSERT INTO jwt (token) VALUES (?)`,
                      [jwt],
                      function(transact, resultat){ console.log("insertion effectuée") },
                      function(transact , err){ console.log("insert error") })
      }) 
    },[jwt])

    const [jwt,setJWT] = useState("");



    const [user,setUser] = useState({email :" ", password : " "});

        // useEffect(function(){
        // console.log("test useEffect jwt");
        // db.transaction(function(tx){
        //     tx.executeSql(`UPDATE utilisateurs SET token = ?,WHERE email = ? ;`,
        //                   [jwt,user.email],
        //                   function(transact, resultat){ console.log("jwt enregistré") },
        //                   function(transact , err){ console.log("erreur jwt") })
        //   })
        // },[jwt])

        return <ProfilContext.Provider value = {{jwt,setJWT,user,setUser}}>
            {props.children}
        </ProfilContext.Provider>
    }
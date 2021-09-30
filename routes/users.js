const express = require("express");
const Users = require("../models/user");
const router = express.Router();

router.post("/login", function (req, res) {
    Users.findOne({ mail: req.body.mail }, function (err, user) {
      if (user) {
        if (!user.validPassword(req.body.password)) {       
          res.status(400).json();
        } else {        
          res.status(201).json(user);        
        }
      } else {
        res.status(400).json();
      }
    });
  });



  router.post("/register", async (req, res) => {
    
    
    const users = new Users({
      name: req.body.name,
      rol: "cliente",
      //password: req.body.password,
      mail: req.body.mail,
      empresa: "",
      
    });
    users.password = users.generateHash(req.body.password);
    try {
      /* console.log("Request" + JSON.stringify(req.body))   */
      const newUsers = await users.save();   
    
      res.status(201).json(newUsers);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  });



  router.post("/update/:mail", async (req, res) => {
    console.log(req.body)

    Users.findOneAndUpdate({ mail: req.params.mail },{ empresa: req.body.empresa},{ upsert: true, returnOriginal : false },
    async function (err, user) {
        
      if (err) {
         return res.status(500, { error: err });
      } else {     
          console.log(user)   
         return res.status(200).json(user);
      }
    }
  ); 
    
   
  });


  async function getUser(req, res, next) {
    let users;
    try {
      users = await Users.findOne({ mail: req.params.mail });
      if (users == null) {
        return res.status(404).json({ message: "No se encontró el usuario" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    res.users = users;
    next();
  }
  


  
module.exports = router;
  
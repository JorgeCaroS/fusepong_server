const express = require('express');
const router = express.Router();
const Empresas = require('../models/empresa');





///////// get Orders /////////////////////////


router.get('/', async(req, res) =>{
    
    try{
        const empresas = await Empresas.find();
        res.header("Access-Control-Allow-Origin", "*");
        res.json(empresas);
         
    }catch(err){
        res.status(500).json({message: err.message})
    }
    
}) 




router.post('/agregar/:empresa',async(req, res) =>{
    console.log(req.params); 
    console.log(req.body);  
     Empresas.findOneAndUpdate({ nombre: req.params.empresa, "proyectos.nombre": req.body.proyecto },{ $push:{"proyectos.0.historias":req.body.historias}},{ upsert: true, returnOriginal : false },
        async function (err, empresa) {
            
          if (err) {
             return res.status(500, { error: err });
          } else {     
              console.log(empresa)   
             return res.status(200).json(empresa);
          }
        }
      ); 
   });


   

   router.post('/agregarTicket/:empresa',async(req, res) =>{
    console.log(req.params); 
    console.log(req.body);  
     Empresas.findOneAndUpdate({ nombre: req.params.empresa, "proyectos.nombre": req.body.proyecto, "proyectos.historias.nombre":req.body.historias },{ $push:{"proyectos.0.historias.$[historias].tickets":req.body.tickets}},{ upsert: true, returnOriginal : false, arrayFilters: [{ "historias.nombre": req.body.historias }], },
        async function (err, empresa) {
            
          if (err) {
             return res.status(500, { error: err });
          } else {     
              console.log(empresa)   
             return res.status(200).json(empresa);
          }
        }
      ); 
   });


   
      router.post('/:editarTicket',async(req, res) => {
         console.log(req.body)
         
         Empresas.findOneAndUpdate({ nombre: req.body.empresa, "proyectos.nombre": req.body.proyecto,
          "proyectos.historias.nombre":req.body.historias,
          "proyectos.historias.tickets._id":req.body.ticketId
          },{ $set:{"proyectos.0.historias.$[historias].tickets":req.body.tickets}},{ upsert: true, returnOriginal : false, arrayFilters: [{ "historias.nombre": req.body.historias }], },
          async function (err, empresa) {
            
            if (err) {
               return res.status(500, { error: err });
            } else {     
                console.log(empresa)   
               return res.status(200).json(empresa);
            }
         }
       ); 
    });



   async function getEmpresa(req, res, next) {
      let empresas
    try {
      empresas = await Empresas.findOne({nombre:req.body.empresa, "proyectos.nombre": req.body.proyecto, "proyectos.historias.nombre":req.body.historias,
       "proyectos.historias.tickets._id":req.body.ticketId});
      if (empresas == null) {
        return res.status(404).json({ message: "No se encontró el pedido" });
      }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }
    res.empresas = empresas;
    next();
  }



module.exports = router;
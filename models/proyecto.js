const mongoose = require("mongoose");
const { Schema } = mongoose;

const ticket = new Schema({ comentarios: String, estado: String });
const historia = new Schema({ nombre: String, descripcion: String, tickets:[ticket] });

const proyectoSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: false,
    },     
    descripcion: {
      type: String,
      required: false,
      
    },
    historias:[historia],
   
  });
  
  module.exports = mongoose.model("proyectos", proyectoSchema);
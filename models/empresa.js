const mongoose = require("mongoose");
const { Schema } = mongoose;



const ticket = new Schema({ comentarios: String, estado: String });
const historia = new Schema({ nombre: String, descripcion: String, tickets:[ticket] });
const proyectos = new Schema({ nombre: String, descripcion: String, historias:[historia] });



const empresaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: false,
  },     
  nit: {
    type: String,
    required: false,
    unique:true, 
  },
  telefono: {
    type: String,
    required: false,
  },
  direccion: {
    type: String,
    required: false,
  },
  mail: {
    type: String,
    required: false,
  },
  mail: {
    type: String,
    required: false,
  }, 
  proyectos:[proyectos],
  
  
});

module.exports = mongoose.model("empresas", empresaSchema);

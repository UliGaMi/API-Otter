const mongoose = require("mongoose");

const PacienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  genero: {
    type: String,
    required: true,
  },
  altura: {
    type: Number,
    required: true,
  },
  nacimiento: {
    type: Date,
    required: true,
  },
  id_nutriologo: {
    type: String,
    required: true,
  }
});



module.exports = mongoose.model("Paciente", PacienteSchema);
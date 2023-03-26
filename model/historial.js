const mongoose = require("mongoose");

const HistorialSchema = new mongoose.Schema({
  id_paciente: {
    type: String,
    required: true,
  },
  imc: {
    type: Number,
    required: true,
  },
  igc: {
    type: Number,
    required: true,
  },
  peso: {
    type: Number,
    required: true,
  },
  actividad_fisica: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  }
});



module.exports = mongoose.model("Historial", HistorialSchema);
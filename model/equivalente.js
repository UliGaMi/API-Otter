
const mongoose = require("mongoose");

const EquivalenteSchema = new mongoose.Schema({
  id_paciente: {
    type: String,
    required: true,
  },
  verduras: {
    type: Number,
    required: true,
  },
  frutas: {
    type: Number,
    default: false,
  },
  cyt_sg: {
    type: Number,
    required: true,
  },
  cyt_cg: {
    type: Number,
    required: true,
  },
  leguminosas: {
    type: Number,
    required: true,
  },
  animal_mb: {
    type: Number,
    required: true,
  },
  animal_b: {
    type: Number,
    required: true,
  },
  animal_m: {
    type: Number,
    required: true,
  },
  animal_a: {
    type: Number,
    required: true,
  },
  leche_d: {
    type: Number,
    required: true,
  },
  leche_sd: {
    type: Number,
    required: true,
  },
  leche_e: {
    type: Number,
    required: true,
  },
  leche_ca: {
    type: Number,
    required: true,
  },
  aceite_sp: {
    type: Number,
    required: true,
  },
  aceite_cp: {
    type: Number,
    required: true,
  },
  azucar_sg: {
    type: Number,
    required: true,
  },
  azucar_cg: {
    type: Number,
    required: true,
  },
  lde: {
    type: Number,
    required: true,
  },
  alcohol: {
    type: Number,
    required: true,
  }



});



module.exports = mongoose.model("Equivalente", EquivalenteSchema);
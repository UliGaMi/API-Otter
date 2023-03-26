const mongoose = require("mongoose");

const NutriologoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
  },
  contrasenia: {
    type: String,
    required: true,
  }
});



module.exports = mongoose.model("Nutriologo", NutriologoSchema);
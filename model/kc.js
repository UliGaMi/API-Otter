const mongoose = require("mongoose");

const KCSchema = new mongoose.Schema({
  id_paciente: {
    type: String,
    required: true,
  },
  geb: {
    type: Number,
    required: true,
  },
  ge: {
    type: Number,
    required: true,
  },
  eta: {
    type: Number,
    required: true,
  },
  efa: {
    type: Number,
    required: true,
  },
  hco: {
    type: Number,
    required: true,
  },
  prot: {
    type: Number,
    required: true,
  },
  lip: {
    type: Number,
    required: true,
  }
});



module.exports = mongoose.model("KC", KCSchema);
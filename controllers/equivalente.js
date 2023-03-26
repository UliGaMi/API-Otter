// constante del modelo de datos
const Equivalente = require("../model/equivalente");
const jwt = require("jsonwebtoken");
// Obtener todos los objetos
/*
const getEquivalentes = async (req, res) => {
  Equivalente.find((err, equivalente) => {
    if (err) {
      res.send(err);
    }
    res.json(equivalente);
  });
};
*/

const getEquivalentes = async (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authData) =>{
    if(error){
      res.sendStatus(403);
    }
    else{
      Equivalente.find({id_paciente: req.params.pacienteID},(err, equivalente) => {
        if (err) {
          res.send(err);
        }
        res.json(equivalente);
      });
    }
  });
  
};

// Crear un objeto con el formato indicado
const createEquivalente = async (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authData) =>{
    if(error){
      res.sendStatus(403);
    }
    else{
      const equivalente = new Equivalente({
        verduras: req.body.verduras,
        frutas: req.body.frutas,
        cyt_sg: req.body.cyt_sg,
        cyt_cg: req.body.cyt_cg,
        leguminosas: req.body.leguminosas,
        animal_mb: req.body.animal_mb,
        animal_b: req.body.animal_b,
        animal_m: req.body.animal_m,
        animal_a: req.body.animal_a,
        leche_d: req.body.leche_d,
        leche_sd: req.body.leche_sd,
        leche_e: req.body.leche_e,
        leche_ca: req.body.leche_ca,
        aceite_sp: req.body.aceite_sp,
        aceite_cp: req.body.aceite_cp,
        azucar_sg: req.body.azucar_sg,
        azucar_cg: req.body.azucar_cg,
        lde: req.body.lde,
        alcohol: req.body.alcohol,
        id_paciente: req.body.id_paciente
      });

      equivalente.save( async (err, equivalente) => {
      if (err) {
        res.send({status: false, message: "Error al registrar la tabla de equivalentes"});
      }
      res.send({status: true, message: "Tabla de equivalentes registrada con éxito"});
      });
    }
  });
  
};

// actualizar un elemento a partir del _id
const updateEquivalente = async (req, res) => {
  Equivalente.findOneAndUpdate(
    { _id: req.params.equivalenteID },
    {
      $set: {
        verduras: req.body.verduras,
        frutas: req.body.frutas,
        cyt_sg: req.body.cyt_sg,
        cyt_cg: req.body.cyt_cg,
        leguminosas: req.body.leguminosas,
        animal_mb: req.body.animal_mb,
        animal_b: req.body.animal_b,
        animal_m: req.body.animal_m,
        animal_a: req.body.animal_a,
        leche_d: req.body.leche_d,
        leche_sd: req.body.leche_sd,
        leche_e: req.body.leche_e,
        leche_ca: req.body.leche_ca,
        aceite_sp: req.body.aceite_sp,
        aceite_cp: req.body.aceite_cp,
        azucar_sg: req.body.azucar_sg,
        azucar_cg: req.body.azucar_cg,
        lde: req.body.lde,
        alcohol: req.body.alcohol,
        id_paciente: req.body.id_paciente
      },
    },
    { new: true },
    (err, Equivalente) => {
      if (err) {
        res.send(err);
      } else res.json(Equivalente);
    }
  );
};

// borrar un elemento a través del _id
const deleteEquivalente = async (req, res) => {
  Equivalente.deleteOne({ _id: req.params.equivalenteID })
    .then(() => res.json({ message: "Equivalente Deleted" }))
    .catch((err) => res.send(err));
};


const deleteEquivalentePaciente = async (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authData) =>{
    if(error){
      res.sendStatus(403);
    }
    else{
      Equivalente.deleteMany({ id_paciente: req.params.pacienteID })
      .then(() => res.send({status: true, message: "Tabla de equivalentes eliminada" }))
      .catch((err) => res.send({status: false, message: "Error al eliminar la tabla de equivalentes" }));
    }
  });
  
};
/*
const deleteEquivalente = async (req, res) => {
  Equivalente.deleteMany({id_paciente: req.params.pacienteID})
    .then(() => res.send({status: true, message: "Tabla de equivalentes eliminada" }))
    .catch((err) => res.send({status: false, message: "Error al eliminar la tabla de equivalentes" }));
};
*/


// 
module.exports = {
  getEquivalentes,
  createEquivalente,
  updateEquivalente,
  deleteEquivalente,
  deleteEquivalentePaciente
};
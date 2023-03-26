
// constante del modelo de datos
const KC = require("../model/kc");
const jwt = require("jsonwebtoken");
// Obtener todos los objetos
/*
const getKCs = async (req, res) => {
  KC.find((err, kc) => {
    if (err) {
      res.send(err);
    }
    res.json(kc);
  });
};
*/
const getKCs = async (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authData) =>{
    if(error){
      res.sendStatus(403);
    }
    else{
      KC.find({id_paciente: req.params.pacienteID},(err, kc) => {
        if (err) {
          res.send(err);
        }
        res.json(kc);
      });
    }
  });
  
};

// Crear un objeto con el formato indicado
const createKC = async (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authData) =>{
    if(error){
      res.sendStatus(403);
    }
    else{
      const kc = new KC({
        id_paciente: req.body.id_paciente,
        geb: req.body.geb,
        ge: req.body.ge,
        eta: req.body.eta,
        efa: req.body.efa,
        hco: req.body.hco,
        prot: req.body.prot,
        lip: req.body.lip
        
      });
      kc.save( async (err, kc) => {
        if (err) {
          res.send({status: false, message: "Error al registrar la tabla de kc"});
        }
        res.send({status: true, message: "Tabla de kc registrada con éxito"});
      });
    }
  });
  
}


// actualizar un elemento a partir del _id
const updateKC = async (req, res) => {
  KC.findOneAndUpdate(
    { _id: req.params.kcID },
    {
      $set: {
        id_paciente: req.body.id_paciente,
        geb: req.body.geb,
        ge: req.body.ge,
        eta: req.body.eta,
        efa: req.body.efa,
        hco: req.body.hco,
        prot: req.body.prot,
        lip: req.body.lip
      },
    },
    { new: true },
    (err, KC) => {
      if (err) {
        res.send(err);
      } else res.json(KC);
    }
  );
};

// borrar un elemento a través del _id
const deleteKC = async (req, res) => {
  KC.deleteOne({ _id: req.params.kcID })
    .then(() => res.json({ message: "KC Deleted" }))
    .catch((err) => res.send(err));
};

const deleteKCPaciente = async (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authData) =>{
    if(error){
      res.sendStatus(403);
    }
    else{
      KC.deleteMany({ id_paciente: req.params.pacienteID })
      .then(() => res.send({status: true, message: "Tabla de kc eliminada" }))
      .catch((err) => res.send({status: false, message: "Error al eliminar la tabla de kc" }));
    }
  });
  
};

// 
module.exports = {
  getKCs,
  createKC,
  updateKC,
  deleteKC,
  deleteKCPaciente
};

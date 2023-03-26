// constante del modelo de datos
const Historial = require("../model/historial");
const jwt = require("jsonwebtoken");
// Obtener todos los objetos
const getHistoriales = async (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authData) =>{
    if(error){
      res.sendStatus(403);
    }
    else{
      Historial.find({id_paciente: req.params.pacienteID} ,(err, historial) => {
        if (err) {
          res.send(err);
        }
        res.json(historial);
      });
    }
  });
  
};


//Obtener el último historial
const getUltimoHistorial = async (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authData) =>{
    if(error){
      res.sendStatus(403);
    }
    else{
      Historial.find({id_paciente: req.params.pacienteID} ,(err, historial) => {
        if (err) {
          res.send(err);
        }
        res.send(historial);
      }).sort({$natural:-1}).limit(1);
    }
  });
  
};


// Crear un objeto con el formato indicado
const createHistorial = async (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authData) =>{
    if(error){
      res.sendStatus(403);
    }
    else{
      const historial = new Historial({
        id_paciente: req.body.id_paciente,
        imc: req.body.imc,
        igc: req.body.igc,
        peso: req.body.peso,
        actividad_fisica: req.body.actividad_fisica,
        descripcion: req.body.descripcion,
        fecha: req.body.fecha
      });
    
      historial.save( async (err, historial) => {
        if (err) {
          res.send({status: false, message: "Error al registrar el historial"});
        }
        res.send({status: true, message: "Historial registrado con éxito"});
      });
    }
  });
  
}

// actualizar un elemento a partir del _id
const updateHistorial = async (req, res) => {
  Historial.findOneAndUpdate(
    { _id: req.params.historialID },
    {
      $set: {
        id_paciente: req.body.id_paciente,
        imc: req.body.imc,
        igc: req.body.igc,
        peso: req.body.peso,
        actividad_fisica: req.body.actividad_fisica,
        descripcion: req.body.descripcion,
        fecha: req.body.fecha
      },
    },
    { new: true },
    (err, Historial) => {
      if (err) {
        res.send(err);
      } else res.json(Historial);
    }
  );
};

// borrar un elemento a través del _id
const deleteHistorial = async (req, res) => {
  Historial.deleteOne({ _id: req.params.historialID })
    .then(() => res.send({status: true, message: "Historial eliminado" }))
    .catch((err) => res.send({status: false, message: "Error al eliminar historial" }));
};


// borrar un elemento a través del id_paciente
const deleteHistorialPaciente = async (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authData) =>{
    if(error){
      res.sendStatus(403);
    }
    else{
      Historial.deleteMany({ id_paciente: req.params.pacienteID })
      .then(() => res.send({status: true, message: "Historiales eliminados" }))
      .catch((err) => res.send({status: false, message: "Error al eliminar los historiales" }));
    }
  });
  
};

// 
module.exports = {
  getHistoriales,
  createHistorial,
  updateHistorial,
  deleteHistorial,
  deleteHistorialPaciente,
  getUltimoHistorial
};
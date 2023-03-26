// Importa la AWS SDK
const AWS = require('aws-sdk');

// Configura las credenciales de AWS
AWS.config.update({
  accessKeyId: 'accessKeyId',
  secretAccessKey: 'secretKey',
  region: 'us-east-1'
});

// Crea un cliente de SNS
const sns = new AWS.SNS();

// Define el ARN del tema al que te quieres suscribir
const topicArn = 'arn';

// Suscribe la dirección de correo electrónico al tema



// constante del modelo de datos
const Nutriologo = require("../model/nutriologo");
const jwt = require("jsonwebtoken");


// Obtener todos los objetos
const getNutriologos = async (req, res) => {
  Nutriologo.find((err, nutriologo) => {
    if (err) {
      res.send(err);
    }
    res.json(nutriologo);
  });
};

const iniciarSesion = async (req, res) => {
  try {
    const correo = req.body.correo;
    const contrasenia = req.body.contrasenia;
    const nutriologo = await Nutriologo.findOne({ correo: correo});
    jwt.sign({nutriologo: nutriologo}, "secretkey", (err, token) => {
      if (!nutriologo) {
        res.send({ status: false, message: 'Correo incorrecto'});
      }
      else {
        if (nutriologo.contrasenia !== contrasenia) {
          res.send({ status: false, message: 'Contraseña incorrecta' });
        }
        else {
          res.send({ status: true, message: 'Sesión iniciada correctamente', nutriologo: nutriologo, token});
        }
      }
    });

    


  } catch (err) {
    res.send({ status: false, message: 'Error en el servidor' });
  }


}

// Crear un objeto con el formato indicado
const createNutriologo = async (req, res) => {
  try {
    const correo = req.body.correo;
    const nutriologo = await Nutriologo.findOne({ correo: correo });
    if (!nutriologo) {
      const nutriologo = new Nutriologo({
        nombre: req.body.nombre,
        correo: req.body.correo,
        contrasenia: req.body.contrasenia,
      });

      nutriologo.save(async (err, nutriologo) => {
        if (err) {
          res.send(err);
        }
        sns.subscribe({
          TopicArn: topicArn,
          Protocol: 'email',
          Endpoint: correo
        }, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log('Suscripción creada: ' + data.SubscriptionArn);
          }
        });
        res.send({status: true, message: 'Usuario registrado con exito'});
      });

    }
    else {
      res.send({ status: false, message: 'La dirrección de correo ya ha sido utilizada para crear una cuenta' });
    }
  }catch(err)
  {
    res.send({ status: false, message: 'Error en el servidor' });
  }
  




};

// actualizar un elemento a partir del _id
const updateNutriologo = async (req, res) => {
  jwt.verify(req.token, 'secretkey', (error, authData) =>{
    if(error){
      res.sendStatus(403);
    }
    else{
      Nutriologo.findOneAndUpdate(
        { _id: req.params.nutriologoID },
        {
          $set: {
            nombre: req.body.nombre,
            correo: req.body.correo,
            contrasenia: req.body.contrasenia
          },
        },
        { new: true },
        (err, Nutriologo) => {
          if (err) {
            res.send({status: false, message: "Los datos no han podido ser actualizados"});
          } else res.send({status: true, message: "Datos actualizados con éxito"});
        }
      );
    }
  });
  
};

// borrar un elemento a través del _id
const deleteNutriologo = async (req, res) => {
  Nutriologo.deleteOne({ _id: req.params.nutriologoID })
    .then(() => res.json({status: true, message: "Nutriólogo Deleted" }))
    .catch((err) => res.send({status: false, message:"No se ha podido borrar al nutriólogo."}));
};

// 
module.exports = {
  getNutriologos,
  createNutriologo,
  updateNutriologo,
  deleteNutriologo,
  iniciarSesion
};
// definicion de librerias
const express = require("express");
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require('fs');
const https = require('https');

// variables de entorno
dotenv.config();

// Puerto 
const PUERTO = 3000;
const app = express();


  

// Libreria para mongodb - usa URL que debe existir en .env
// usa la Base de datos llamada mongo y la coleccion llamada todos
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
// se usa con express, peticiones cruzadas.
app.use(cors());

//
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// uso de router.js
app.use(router);

https.createServer({
  cert: fs.readFileSync('fullchain1.pem', 'utf-8'),
  key: fs.readFileSync('privkey1.pem', 'utf-8')
  },app).listen(PUERTO, function(){
  console.log('Servidor https corriendo en el puerto 3000');
  });

app.get('/', function(req, res){
  res.send('Hola, estas en la pagina inicial');
  console.log('Se recibio una petición get a través de https');
  });


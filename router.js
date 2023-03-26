// definicion de rutas
const verifyToken = require("./controllers/verify");


const {
  getNutriologos,
  createNutriologo,
  updateNutriologo,
  deleteNutriologo,
  iniciarSesion
} = require("./controllers/nutriologo");

const {
  getPacientes,
  createPaciente,
  updatePaciente,
  deletePaciente,
} = require("./controllers/paciente");

const {
  getHistoriales,
  createHistorial,
  updateHistorial,
  deleteHistorial,
  deleteHistorialPaciente,
  getUltimoHistorial
} = require("./controllers/historial");

const {
  getKCs,
  createKC,
  updateKC,
  deleteKC,
  deleteKCPaciente
} = require("./controllers/kc");

const {
  getEquivalentes,
  createEquivalente,
  updateEquivalente,
  deleteEquivalente,
  deleteEquivalentePaciente
} = require("./controllers/equivalente");

const router = require("express").Router();


const rateLimit = require("express-rate-limit");

const accountLimiterLogin = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hora
    max: 200, // limita cada IP a 6 peticiones por el tiempo definido con "windowMs"
    message: {status: false, message:"Se ha alcanzado el límite de inicios de sesión, espere una hora y vuelva a intentar"},
});

const accountLimiterRegister = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 60, // limita cada IP a 6 peticiones por el tiempo definido con "windowMs"
  message: {status: false, message:"Se ha alcanzado el límite de registros, espere una hora y vuelva a intentar"},
});
// ruta get principal






//NUTRIOLOGOS

// ruta get /nutriologos
router.get("/nutriologos", getNutriologos);
// ruta post todos
router.post("/nutriologos", accountLimiterRegister, createNutriologo);
// ruta put nutriologos
router.put("/nutriologos/:nutriologoID", verifyToken, updateNutriologo);
// ruta delete nutriologos
router.delete("/nutriologos/:nutriologoID", deleteNutriologo);
//iniciar sesión
router.post("/nutriologos/iniciar", accountLimiterLogin, iniciarSesion);


//PACIENTES

// ruta get /pacientes
router.get("/pacientes/:nutriologoID", verifyToken, getPacientes);
// ruta post todos
router.post("/pacientes", verifyToken, createPaciente);
// ruta put pacientes
router.put("/pacientes/:pacienteID", updatePaciente);
// ruta delete pacientes
router.delete("/pacientes/:pacienteID", verifyToken, deletePaciente);


//HISTORIAL

// ruta get /historiales
router.get("/historiales/:pacienteID", verifyToken, getHistoriales);
router.get("/ultimohistorial/:pacienteID", verifyToken, getUltimoHistorial);
// ruta post historiales
router.post("/historiales", verifyToken, createHistorial);
// ruta put historiales
router.put("/historiales/:historialID", updateHistorial);
// ruta delete historiales
router.delete("/historiales/:historialID", deleteHistorial);
router.delete("/historiales/paciente/:pacienteID", verifyToken, deleteHistorialPaciente);


//KC

// ruta get /kcs
router.get("/kcs/:pacienteID", verifyToken, getKCs);
// ruta post kcs
router.post("/kcs", verifyToken, createKC);
// ruta put kcs
router.put("/kcs/:kcID", updateKC);
// ruta delete kcs
router.delete("/kcs/:kcID", deleteKC);
router.delete("/kcs/paciente/:pacienteID", verifyToken, deleteKCPaciente);

//Equivalente

// ruta get /equivalentes
router.get("/equivalentes/:pacienteID", verifyToken, getEquivalentes);
// ruta post equivalentes
router.post("/equivalentes", verifyToken, createEquivalente);
// ruta put equivalentes
router.put("/equivalentes/:equivalenteID", updateEquivalente);
// ruta delete equivalentes
router.delete("/equivalentes/:equivalenteID", deleteEquivalente);
router.delete("/equivalentes/paciente/:pacienteID", verifyToken, deleteEquivalentePaciente);

module.exports = router;

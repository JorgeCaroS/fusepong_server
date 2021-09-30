const express = require("express");
const app = express();
const mongoose = require("mongoose");
//mongoose.set('useCreateIndex', true);
//mongoose.set('useFindAndModify', false);
const cors = require("cors");

//const basicAuth = require('express-basic-auth');
require("dotenv").config({ path: __dirname + "/.env" });

const MONGO_CONFIG = process.env.MONGO_CONFIG;



var bodyParser = require('body-parser');







app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({limit: "50mb"}));
//app.use(bodyParser.json());
app.use(cors());

// use basic HTTP auth to secure the api
/* app.use("/api/productos", basicAuth);
app.use("/api/users", basicAuth);
app.use("/api/treatmentusers", basicAuth);
app.use("/api/pedidos", basicAuth);
app.use("/api/allmedia", basicAuth);
app.use("/users", require("../users/user.controller")); */



mongoose.connect(MONGO_CONFIG, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const conn = mongoose.connection;

conn.on("error", (error) => console.error(error));
conn.once("open", () => {
  console.log("Conectado a MongoDB");
});

//////////////////////////////
app.use(express.json());

const empresasRouter = require("./routes/empresas");
app.use("/api/empresas", empresasRouter);

const usersRouter = require("./routes/users");
app.use("/api/users", usersRouter);


 


module.exports = app;
app.listen(3500, () => console.log("Fusepong Servidor Iniciado..."));

/*
  https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app).listen(3000, () => {
  console.log('Listening...')
}) 
 

*/
 
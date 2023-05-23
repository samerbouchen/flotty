const express= require("express");
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser'); 
const db= require('./models');
const controller = require("./controller/controller");
const userRoutes = require("./routes/userRoutes");
const reclamation = require("./routes/reclamation");
const alert = require("./routes/alertRoutes");

controller.connection();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




app.use("/" , userRoutes);
app.use("/" , reclamation);
app.use("/" , alert);


app.listen(3006, () => console.log(`Hello world app listening on port 3006!`))





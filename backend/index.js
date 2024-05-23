var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();
var router = express.Router();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

var corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Cinema API",
      version: "1.0.0",
      description: "Employee API Information",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use("/api", router);

var employee = require("./routes/Employee");
app.use("/api/employees", employee);

var authentication = require("./routes/Authentication");
app.use("/api/auth", authentication); 

var account = require("./routes/Account");
app.use("/api/account", account);

var film = require("./routes/Film");
app.use("/api/films", film);


var port = process.env.PORT || 8090;
app.listen(port);
console.log("Employee API is runnning at " + port);

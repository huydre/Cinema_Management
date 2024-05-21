var Employee = require('./models/employee');
const dboperations = require('./dboperation');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

var corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/api', router);

router.route('/employees').get((req, res) => {
    dboperations.getEmployee().then(result => {
        // console.log(result);
        res.json(result[0]);
    });
}); 

var port = process.env.PORT || 8090;
app.listen(port);
console.log('Employee API is runnning at ' + port);
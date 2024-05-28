var express = require('express');
var router = express.Router();
var dboperations = require('../controllers/TicketController');

router.post('/', (req, res) => {
    let ticket = req.body;
    dboperations.purchaseTicket(ticket).then(result => {
        // console.log(result);
        if (result.status === 'success') {
            res.status(201).json(result.message);
        }
        else {
            res.status(500).send(result.message);
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send(err);
    });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var dboperations = require('../controllers/HelperController');

router.get('/', (req, res) => {
    dboperations.getDSPM().then(result => {
        if(result) {
            res.json(result);
        } else {
            res.status(500).send('Error retrieving publications');
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error retrieving publications');
    });
});

router.get('/statistics', (req, res) => {
    dboperations.getStatistics().then(result => {
        if(result) {
            res.json(result);
        } else {
            res.status(500).send('Error retrieving publications');
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error retrieving publications');
    });
});

router.get('/revenue30', (req, res) => {
    dboperations.getRevenueLast30Days().then(result => {
        if(result) {
            res.json(result);
        } else {
            res.status(500).send('Error retrieving publications');
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error retrieving publications');
    });
});

module.exports = router;
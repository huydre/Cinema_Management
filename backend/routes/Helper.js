var express = require('express');
var router = express.Router();
var dboperations = require('../controllers/HelperController');

router.get('/', (req, res) => {
    dboperations.getPublications().then(result => {
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
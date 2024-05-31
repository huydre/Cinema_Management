var express = require('express');
var router = express.Router();
var dboperations = require('../controllers/ScheduleController');

router.get('/', (req, res) => {
    dboperations.getAllSchedule(req.headers).then(result => {
        if(result) {
            res.json(result[0]);
        } else {
            res.status(500).send('Error retrieving schedules');
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error retrieving schedules');
    });
});

router.get('/:id', (req, res) => {
    dboperations.getScheduleById(req.params.id).then(result => {
        if(result) {
            res.json(result[0][0]);
        } else {
            res.status(404).send('Schedule not found');
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error retrieving schedule');
    });
});

router.post('/', (req, res) => {
    let schedule = req.body;
    dboperations.addSchedule(schedule).then(result => {
        if (result) {
            res.status(201).json(result[0]);
        }
        else {
            res.status(500).send('Error adding schedule');
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error adding schedule');
    });
});

router.put('/:id', (req, res) => {
    let schedule = req.body;
    dboperations.updateSchedule(req.params.id, schedule).then(result => {
        if(result) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).send('Schedule not found');
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error updating schedule');
    });
});

router.delete('/:id', (req, res) => {
    dboperations.deleteSchedule(req.params.id).then(result => {
        if(result) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).send('Schedule not found');
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error deleting schedule');
    });
});

router.get('/film/:id', (req, res) => {
    dboperations.getScheduleByFilmId(req.params.id).then(result => {
        if(result) {
            res.json(result[0]);
        } else {
            res.status(404).send('Schedule not found');
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error retrieving schedule');
    });
});

module.exports = router;
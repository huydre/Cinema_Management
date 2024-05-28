var express = require('express');
var router = express.Router();
var dboperations = require('../controllers/SeatController');

router.get('/', (req, res) => {
    dboperations.getAllSeat().then(result => {
        if(result) {
            res.json(result[0]);
        } else {
            res.status(500).send('Error retrieving seats');
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error retrieving seats');
    });
});

router.get('/:id', (req, res) => {
    dboperations.getSeatById(req.params.id).then(result => {
        if(result) {
            res.json(result[0][0]);
        } else {
            res.status(404).send('Seat not found');
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error retrieving seat');
    });
});

router.post('/', (req, res) => {
    let seat = req.body;
    dboperations.addSeat(seat).then(result => {
        if (result) {
            res.status(201).json(result[0]);
        }
        else {
            res.status(500).send('Error adding seat');
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error adding seat');
    });
});

router.put('/:id', (req, res) => {
    let seat = req.body;
    dboperations.updateSeat(req.params.id, seat).then(result => {
        if(result) {
            res.status(200).json(result[0]);
        } else {
            res.status(404).send('Seat not found');
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error updating seat');
    });
});

router.delete('/:id', (req, res) => {
    dboperations.deleteSeat(req.params.id).then(result => {
        if(result) {
            res.status(200).send('Seat deleted');
        } else {
            res.status(404).send('Seat not found');
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error deleting seat');
    });
});

router.post('/room', (req, res) => {
    const { roomId, scheduleId } = req.body;
    console.log(req);
    dboperations.getSeatByRoomIdAndScheduleId(roomId, scheduleId).then(result => {
        if(result) {
            console.log(result);
            res.json(result);
        } else {
            res.status(500).send('Error retrieving room and schedule');
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error retrieving room and schedule');
    });
});

module.exports = router;
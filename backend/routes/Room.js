var express = require('express');
var router = express.Router();
var dboperations = require('../controllers/RoomController');

router.get('/', (req, res) => {
    dboperations.getAllRooms().then(result => {
        if(result) {
            res.json(result[0]);
        } else {
            res.status(500).send('Error retrieving rooms');
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error retrieving rooms');
    });
});

router.get('/:id', (req, res) => {
    dboperations.getRoomById(req.params.id).then(result => {
        if(result[0].length) {
            res.json(result[0]);
        } else {
            res.status(404).send('Room not found');
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Server error');
    });
});

router.post('/', (req, res) => {
    let room = req.body;
    dboperations.insertRoom(room).then(result => {
        // res.status(201).json(result[0]);
        if (!result) res.status(404).send('Room already exists');
        else {
            res.status(200).json("Room inserted successfully");
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error inserting room');
    });
});

router.put('/:id', (req, res) => {
    let room = req.body;
    dboperations.updateRoom(req.params.id, room).then(result => {
        if (!result) res.status(404).send('Room not found');
        else {
            res.status(200).json("Room updated successfully");
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error updating room');
    });
});

router.delete('/:id', (req, res) => {
    dboperations.deleteRoom(req.params.id).then(result => {
        // res.status(200).json(result[0]);
        if (!result) res.status(404).send('Room not found');
        else {
            res.status(200).json("Room deleted successfully");
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error deleting room');
    });
});

module.exports = router;
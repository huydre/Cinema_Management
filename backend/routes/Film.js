var express = require('express');
var router = express.Router();
var dboperations = require('../controllers/FilmController');


router.get('/top', (req, res) => {
    dboperations.getTop3Highest().then(result => {
        if(result) {
            res.json(result[0]);
        } else {
            res.status(500).send('Error retrieving films');
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error retrieving films');
    });
});

/**
 * @swagger
 * /api/films:
 *   get:
 *     tags: [Films]
 *     description: Get all films
 *     responses:
 *       200:
 *         description: Get films successful
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Film'
 *       500:
 *         description: Error retrieving films
 */
router.get('/', (req, res) => {
    dboperations.getAllFilms().then(result => {
        if(result) {
            res.json(result[0]);
        } else {
            res.status(500).send('Error retrieving films');
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error retrieving films');
    });
});

/**
 * @swagger
 * /api/films/{id}:
 *   get:
 *     tags: [Films]
 *     description: Get a film by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The film ID
 *     responses:
 *       200:
 *         description: Get film successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Film'
 *       404:
 *         description: Film not found
 *       500:
 *         description: Server error
 */
router.get('/:id', (req, res) => {
    dboperations.getFilmById(req.params.id).then(result => {
        if(result) {
            res.json(result[0]);
        } else {
            res.status(500).send('Error retrieving film');
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error retrieving film');
    });
});

/**
 * @swagger
 * /api/films:
 *   post:
 *     tags: [Films]
 *     description: Insert a new film
 *     parameters:
 *       - in: body
 *         name: film
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Film'
 *         description: The film to create
 *     responses:
 *       201:
 *         description: Film inserted
 *       500:
 *         description: Error inserting film
 */
router.post('/', (req, res) => {
    let film = req.body;
    dboperations.insertFilm(film).then(result => {
        res.status(201).json("Film inserted");
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error inserting film');
    });
});

/**
 * @swagger
 * definitions:
 *   Film:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       name:
 *         type: string
 *       duration:
 *         type: integer
 *       poster_path:
 *         type: string
 *       country:
 *         type: string
 *       overview:
 *         type: string
 *
 * /api/films/{id}:
 *   put:
 *     tags: [Films]
 *     description: Update a film
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The film ID
 *       - in: body
 *         name: film
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Film'
 *         description: The film to update
 *     responses:
 *       200:
 *         description: Film updated
 *       404:
 *         description: Film not found
 *       500:
 *         description: Error updating film
 */
router.put('/:id', (req, res) => {
    let film = req.body;
    dboperations.updateFilm(req.params.id, film).then(result => {
        res.status(201).json("Film updated");
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error updating film');
    });
});

/**
 * @swagger
 * /api/films/{id}:
 *   delete:
 *     tags: [Films]
 *     description: Delete a film
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The film ID
 *     responses:
 *       200:
 *         description: Film deleted
 *       404:
 *         description: Film not found
 *       500:
 *         description: Error deleting film
 */
router.delete('/:id', (req, res) => {
    dboperations.deleteFilm(req.params.id).then(result => {
        res.status(200).json("Film deleted");
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error deleting film');
    });
});






module.exports = router;
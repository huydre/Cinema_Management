var express = require('express');
var router = express.Router();
var dboperations = require('../controllers/AuthenticationController');
var jwt = require('jsonwebtoken');


/**
 * @swagger
 * /api/authentication/login:
 *   post:
 *     tags: [Authentication]
 *     description: Login to the application
 *     parameters:
 *       - in: body
 *         name: login
 *         description: The login details to create.
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *             token:
 *               type: string
 *       501:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post('/login', (req, res) => {
    dboperations.login(req.body.email, req.body.password).then(result => {
        if(result.status === 'success') {
            var token = jwt.sign({ id: result.data[0].uid }, 'a3K8Bx8Pro7Nhv2yh4Z6j8SgF9OyW5F2', { expiresIn: '3h' });
            res.json({ status: 'success', token: token });
        } else {
            res.status(501).send(result.message);
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error retrieving employee');
    });
});

module.exports = router;
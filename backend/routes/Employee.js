var express = require('express');
var router = express.Router();
var dboperations = require('../controllers/EmployeeController');


/**
 * @swagger
 * tags: [Employees]
 * /api/employees:
 *   get:
 *     tags: [Employees]
 *     description: Retrieve the full list of employees
 *     responses:
 *       200:
 *         description: List of employees
 *       500:
 *         description: Error retrieving employees
 */
router.get('/', (req, res) => {
    dboperations.getEmployee(req.headers).then(result => {
        if(result) {
            res.json(result[0]);
        } else {
            res.status(500).send('Error retrieving employees');
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error retrieving employees');
    });
});

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     tags: [Employees]
 *     description: Retrieve a single employee
 *     parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *         minimum: 1
 *     responses:
 *       200:
 *         description: Single employee
 */
router.get('/:id', (req, res) => {
    dboperations.getEmployeeById(req.params.id).then(result => {
        console.log(result);
        if(result.status === 'success') {
            res.json(result.data[0]);
        } else {
            res.status(501).send(result.message);
        }
    }).catch(err => {
        console.error(err);
        res.status(500).send('Error retrieving employee');
    });
});

/**
 * @swagger
 * tags: [Employees]
 * /api/employees:
 *   post:
 *     tags: [Employees]
 *     description: Insert a new employee
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: employee
 *         description: The employee to create.
 *         schema:
 *           type: object
 *           required:
 *             - uid
 *             - fullname
 *             - email
 *             - password
 *             - phone
 *             - role
 *             - cinemaId
 *           properties:
 *             uid:
 *               type: string
 *             fullname:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             phone:
 *               type: string
 *             role:
 *               type: string
 *             cinemaId:
 *               type: string
 *     responses:
 *       201:
 *         description: Employee created
 *       500:
 *         description: Error creating employee
 */
router.post('/', (req, res) => {
    let employee = req.body;
    dboperations.insertEmployee(employee).then(result => {
        if(result.status === 'success') {
            res.json({
                status: 'success',
                message: 'Employee added successfully'
            });
        } else {
            res.status(501).json({ message: result.message });
        }
    }).catch(err => {
        res.status(500).json({ message: result.message });
    });
});

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     tags: [Employees]
 *     description: Update an existing employee
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The employee ID.
 *       - in: body
 *         name: employee
 *         description: The employee to update.
 *         schema:
 *           type: object
 *           properties:
 *             uid:
 *               type: string
 *             fullname:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             phone:
 *               type: string
 *             role:
 *               type: string
 *             cinemaId:
 *               type: string
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       501:
 *         description: Error updating employee
 *       500:
 *         description: Server error
 */
router.put('/:id', (req, res) => {
    let employee = req.body;
    dboperations.updateEmployee(employee).then(result => {
        if(result.status === 'success') {
            res.json({
                status: 'success',
                message: 'Employee updated successfully'
            });
        } else {
            res.status(501).json({ message: result.message });
        }
    }).catch(err => {
        res.status(500).json({ message: result.message });
    });
});


/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     tags: [Employees]
 *     description: Delete an existing employee
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The employee ID.
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Server error
 */

router.delete('/:id', (req, res) => {
    dboperations.deleteEmployee(req.params.id).then(result => {
        if(result.status === 'success') {
            res.json({
                status: 'success',
                message: 'Employee deleted successfully'
            });
        } else {
            res.status(501).json({ message: result.message });
        }
    }).catch(err => {
        res.status(500).json({ message: result.message });
    });
});

module.exports = router;
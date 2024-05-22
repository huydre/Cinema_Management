var express = require("express");
var router = express.Router();
var dboperations = require("../controllers/EmployeeController");
var jwt = require("jsonwebtoken");


/**
 * @swagger
 * /api/account:
 *   get:
 *     tags: [Account]
 *     description: Get account information
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get account successful
 *         schema:
 *           type: object
 *           properties:
 *             auth:
 *               type: boolean
 *             data:
 *               $ref: '#/definitions/Account'
 *       403:
 *         description: No token provided
 *       500:
 *         description: Failed to authenticate token or server error
 */
router.get("/", async (req, res) => {
  try {
    var token = req.headers["authorization"];
    if (!token) {
      return res
        .status(403)
        .send({ auth: false, message: "No token provided." });
    }

    token = token.slice(7, token.length).trimLeft();

    jwt.verify(
      token,
      "a3K8Bx8Pro7Nhv2yh4Z6j8SgF9OyW5F2",
      function (err, decoded) {
        if (err) {
          return res
            .status(500)
            .send({ auth: false, message: "Failed to authenticate token." });
        }
        req.userId = decoded.id;
      }
    );
    dboperations
      .getEmployeeById(req.userId)
      .then((result) => {
        if (result.status === "success") {
          return res.status(200).send({ auth: true, data: result.data[0] });
        } else {
          res.status(501).send(result.message);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error retrieving user");
      });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Server error" });
  }
});

module.exports = router;

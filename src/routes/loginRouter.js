const express = require('express');
const generateToken = require('../utils/generateToken');
const validateEmail = require('../middlewares/validateEmail');
const validadePassword = require('../middlewares/validatePassword');

const router = express.Router();

router.post('/', validateEmail, validadePassword, (req, res) => {
    try {
      const token = generateToken();
      res.status(200).json({ token });
    } catch (err) { 
      res.status(500).send({ message: err.message });
    }
  });

module.exports = router;
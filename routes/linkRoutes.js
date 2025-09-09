const express = require('express');
const router = express.Router();
const linkController = require('../controllers/linkController');

// Rota para criar o link curto
router.post('/create', linkController.createLink);

// Rota para redirecionamento via ID curto
router.get('/:id', linkController.getLink);

module.exports = router;

const express = require('express');
const router = express.Router();
const ordinaryLevelPassControllers = require('../controllers/ordinaryLevelPassController');

router.post('/', ordinaryLevelPassControllers.addOrdinaryLevelPass);
router.put('/:id', ordinaryLevelPassControllers.updateOrdinaryLevelPass);
router.delete('/:id', ordinaryLevelPassControllers.deleteOrdinaryLevelPass);

// Get all ordinary level pass papers
router.get('/', ordinaryLevelPassControllers.getAllOrdinaryLevelPass);

// Get a single ordinary level pass paper by ID
router.get('/:id', ordinaryLevelPassControllers.getOrdinaryLevelPassById);

module.exports = router;

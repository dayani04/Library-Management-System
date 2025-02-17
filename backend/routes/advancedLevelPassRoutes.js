const express = require('express');
const router = express.Router();
const advancedLevelPassControllers = require('../controllers/advancedLevelPassController');

router.post('/', advancedLevelPassControllers.addAdvancedLevelPass);
router.put('/:id', advancedLevelPassControllers.updateAdvancedLevelPass);
router.delete('/:id', advancedLevelPassControllers.deleteAdvancedLevelPass);
router.get('/', advancedLevelPassControllers.getAllAdvancedLevelPass);
router.get('/:id', advancedLevelPassControllers.getAdvancedLevelPassById);

module.exports = router;

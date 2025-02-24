
const express = require('express');
const router = express.Router();
const requestControllers = require('../controllers/requestControllers');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, requestControllers.createRequest);
router.put('/reject/:id', authMiddleware, requestControllers.rejectRequest);
router.get('/', authMiddleware, requestControllers.fetchRequests);
router.put('/approve/:id', authMiddleware,requestControllers.approveRequest); 

module.exports = router;

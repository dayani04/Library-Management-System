const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/adminControllers");

router.get("/", adminControllers.getAllAdmins);
router.post("/", adminControllers.addAdmin);  
router.get("/:id", adminControllers.getAdminById);
router.put("/:id", adminControllers.updateAdmin);
router.delete("/:id", adminControllers.deleteAdmin);
router.post("/login", adminControllers.adminLogin);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateMe,
  deleteMe,
} = require("../controllers/userController");
const { restrictTo } = require("../middleware/auth");

router.get("/", restrictTo("admin"), getAllUsers);
router.get("/:id", getUserById);
router.put("/me", updateMe);
router.delete("/me", restrictTo("admin"), deleteMe);

module.exports = router;

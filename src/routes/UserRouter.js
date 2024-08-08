const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserController");
const {
  authMiddleware,
  authUserMiddleware,
} = require("../middlewares/authMiddleware");

router.post("/sign-up", userController.createUser);
router.post("/login", userController.loginUser);
router.post("/log-out", userController.logoutUser);
router.put("/update-user/:id", userController.updateUser);
router.delete("/delete-user/:id", authMiddleware, userController.deleteUser);
router.get(
  "/get-details-user/:id",
  authUserMiddleware,
  userController.getDetailsUser
);
router.post("/refresh-token", userController.refreshToken);

module.exports = router;

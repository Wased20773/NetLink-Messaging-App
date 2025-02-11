const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(registerUser).get(protect, allUsers);
router.post("/login", authUser);

// router.get("/chats", (req, res) => {
//   // Handle fetching chat data
//   res.json({ message: "Chat data here" });
// });

module.exports = router;

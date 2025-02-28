const express = require("express");
const {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
  toggleFavorite,
  fetchFavorites,
  deleteChat,
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);

// For Groups
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupadd").put(protect, addToGroup);
router.route("/groupremove").put(protect, removeFromGroup);

// For Chat
router.route("/:chatId").delete(protect, deleteChat);

// For Favorites
router.route("/favorite/:chatId").put(protect, toggleFavorite);
router.route("/favorites").get(protect, fetchFavorites);

module.exports = router;

import express from "express";
import {
  getStories,
  getStory,
  createStory,
  updateStory,
  likeStory,
  deleteStory,
} from "../controllers/stories.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getStories);
router.get("/:id", getStory);
router.post("/", auth, createStory);
router.patch("/:id", auth, updateStory);
router.patch("/:id/like", auth, likeStory);
router.delete("/:id", auth, deleteStory);

export default router;

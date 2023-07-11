import express from "express";
import {
  getStories,
  getStory,
  createStory,
  updateStory,
  likeStory,
  deleteStory,
} from "../controllers/stories.js";

const router = express.Router();

router.get("/", getStories);
router.get("/:id", getStory);
router.post("/", createStory);
router.patch("/:id", updateStory);
router.patch("/:id/like", likeStory);
router.delete("/:id", deleteStory);

export default router;

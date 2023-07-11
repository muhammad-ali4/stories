import mongoose from "mongoose";
import Story from "../models/Story.js";

export const getStories = async (req, res) => {
  try {
    const stories = await Story.find();
    res.status(200).json(stories);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getStory = async (req, res) => {
  const { id } = req.params;
  try {
    const story = await Story.findById(id);
    res.status(200).json(story);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createStory = async (req, res) => {
  const story = req.body;
  let tags = story.tags.split(" ");
  story.tags = tags;

  const newStory = new Story(story);

  try {
    await newStory.save();
    res.status(201).json(newStory);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateStory = async (req, res) => {
  const { id } = req.params;
  const story = req.body;
  let tags = story.tags.split(" ");
  story.tags = tags;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that ID");

  const updatedStory = await Story.findByIdAndUpdate(id, story, { new: true });
  res.json(updatedStory);
};

export const likeStory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that ID");

  const story = await Story.findById(id);
  story.likeCount++;
  await story.save();
};

export const deleteStory = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that ID");

  await Story.findByIdAndRemove(id);

  return res.json({ message: "Post deleted successfully." });
};

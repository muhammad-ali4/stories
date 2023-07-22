import mongoose from "mongoose";

const storySchema = mongoose.Schema({
  title: String,
  content: String,
  author: String,
  creator: String,
  tags: [String],
  image: String,
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Story = mongoose.model("Story", storySchema);

export default Story;

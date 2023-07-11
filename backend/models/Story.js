import mongoose from "mongoose";

const storySchema = mongoose.Schema({
  title: String,
  content: String,
  author: String,
  tags: [String],
  image: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Story = mongoose.model("Story", storySchema);

export default Story;

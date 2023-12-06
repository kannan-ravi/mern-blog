import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  subtitle: {
    type: String,
    required: true,
  },

  content: {
    type: {},
    required: true,
  },

  author: {
    type: String,
    required: true,
  },

  category: {
    type: [],
    required: true,
  },

  datetime: {
    type: String,
    default: new Date().toLocaleString(),
    required: true,
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const postModel = mongoose.model("Post", postSchema);
export default postModel;

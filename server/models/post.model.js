import mongoose from "mongoose";

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  subtitle: {
    type: String,
  },

  content: {
    type: [],
    required: true,
  },

  author: {
    type: String,
    required: true,
  },

  dateTime: {
    type: String,
    default: new Date().toLocaleString(),
    required: true,
  },
});

const postModel = mongoose.model("Post", postSchema);
export default postModel;

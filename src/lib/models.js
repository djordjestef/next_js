import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      max: 20,
    },
    password: {
      type: String,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },

    img: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const messageSchema = new mongoose.Schema(
  {
    messageId: {
      type: String,
      required: true,
      // unique: true,
    },
    // toUser: {
    //   type: String,
    // },
    // fromUser: {
    //   type: String,
    // },
    content: {
      type: String,
      required: true,
    },
    toID: {
      type: String,
      required: true,
    },
    fromID :{
      type:String,
      required: true,
    },
    // fromSelf:{
    //   type: Boolean,
    //   required:true
    // }
    // fromID: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Post = mongoose.models.Post || mongoose.model("Post", postSchema);
export const Messages =
  mongoose.models.Messages || mongoose.model("Messages", messageSchema);

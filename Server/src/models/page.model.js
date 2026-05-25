import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "ai"],
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const pageSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: 300,
    },

    path: {
      type: String,
      match: /^\/([a-z0-9-]+)?$/,
      required: true,
      lowercase: true,
      trim: true,
    },

    prompts: {
      type: [messageSchema],
      default: [],
    },

    aiModel: {
      type: String,
      default: "",
    },

    version: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

pageSchema.index(
  { owner: 1, path: 1 },
  { unique: true }
);

const Page = mongoose.model("Page", pageSchema);
export default Page;
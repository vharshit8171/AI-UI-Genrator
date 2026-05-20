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

const websiteSchema = new mongoose.Schema({
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
        maxlength: 100,
    },

    description: {
        type: String,
        trim: true,
        maxlength: 300,
    },

    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },

    prompts: {
      type: [messageSchema],
      default: [],
    },

    aiResponse: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },

    aiModel: {
      type: String,
    },

    status: {
        type: String,
        enum: ["draft", "published"],
        default: "draft",
    },

    deploymentUrl: String,

    version: {
        type: Number,
        default: 1
    }
},
    {timestamps: true,}
);

const Website = mongoose.model("Website", websiteSchema);

export default Website;
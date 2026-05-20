import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
    website: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Website",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },

    path: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    order: {
      type: Number,
      default: 0,
    },

    // seo: {
    //   title: {
    //     type: String,
    //     trim: true,
    //     maxlength: 100,
    //   },
    //   description: {
    //     type: String,
    //     trim: true,
    //     maxlength: 300,
    //   },
    // },

    isHomePage: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

// Ensure unique path per website
pageSchema.index({ website: 1, path: 1 }, { unique: true });

const Page = mongoose.model("Page", pageSchema);

export default Page;
import mongoose from "mongoose";

const componentSchema = new mongoose.Schema(
  {
    page: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Page",
      required: true,
      index: true,
    },

    type: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    name: {
      type: String,
      trim: true,
    },

    props: {     // actual content.
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    styles: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    order: {
      type: Number,
      default: 0,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
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

// Index for ordering components inside a page
componentSchema.index({ page: 1, order: 1 });

const Component = mongoose.model("Component", componentSchema);

export default Component;
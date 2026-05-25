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
      enum: ["navbar","hero","features","about","services","pricing","testimonials","stats","cta","faq","contact","gallery","footer","richtext",],
      required: true,
      trim: true,
    },

    props: {
      type: Object,
      default: {},
    },

    styles: {
      type: Object,
      default: {},
    },

    order: {
      type: Number,
      required: true,
      min:1
    },
  },
  {
    timestamps: true,
  }
);

componentSchema.index(
  { page: 1, order: 1 },
  {unique: true}
);

const Component = mongoose.model("Component", componentSchema);
export default Component;
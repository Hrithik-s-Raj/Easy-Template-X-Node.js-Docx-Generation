import mongoose from "mongoose";

const DocumentSchema = mongoose.Schema(
  {
    CompanyName: {
      type: String,
    },
    ProductName: {
      type: String,
    },
    Number: {
      type: Number,
    },
    Products: [
      {
        Product: String,
        Technology: String,
      },
    ],

    images: [{ _id: false, url: String, width: Number, height: Number }],
  },
  { timestamps: true }
);

export default mongoose.model("Document", DocumentSchema);

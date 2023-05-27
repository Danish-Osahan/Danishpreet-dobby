import mongoose from "mongoose";

const imageSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
   
    user: {
      // just in case we need
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    // picture:String,
    picture: {
      type: String,
      // required: true,
      default:
        "https://static.vecteezy.com/system/resources/previews/007/405/610/non_2x/abstract-psychedelic-retro-ocean-background-free-vector.jpg",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Image',imageSchema)

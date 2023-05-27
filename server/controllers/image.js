import Image from "../models/imageModel.js";

export const getImages = async (req, res) => {
  try {
    const images = await Image.find({ user: req.user._id });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: error});
  }
};

export const createImage=async(req, res) => {
     const {title,picture}=req.body;

    try {
        const image=new Image({
            user: req.user._id,
            title,
            picture
        })

        const createdImage= await image.save();
        if(createImage)res.status(200).json(createdImage);

    } catch (error) {
        res.status(500).json({ error: error});
    }
};

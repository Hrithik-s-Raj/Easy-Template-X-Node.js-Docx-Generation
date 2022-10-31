import Document from "../models/docData.js";

//
export const getDetail = async (req, res, next) => {
  try {
    const detail = await Document.find();
    res.status(200).json(detail);
  } catch (err) {
    console.log(err);
  }
};

export const addDetail = async (req, res, next) => {
  const newDetail = new Document(req.body);

  try {
    const ndetail = await newDetail.save();

    res.status(200).json({
      status: "Success",
      data: {
        ndetail,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

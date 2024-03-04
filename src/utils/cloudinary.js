const cloudinary = require("../config/cloudinary");

exports.upload = async (path) => {
  try {
    const res = await cloudinary.uploader.upload(path, {
      use_filename: true,
    });
    return res;
  } catch (error) {
    console.log("upload error", error);
  }
};

exports.destroy = async (publicKey) => {
  try {
    const res = await cloudinary.uploader.destroy(publicKey);
    console.log(res);
    return res;
  } catch (error) {
    console.log("Destroy error", error);
  }
};

exports.destroyMany = async (publicKeyArray) => {
  try {
    const res = await cloudinary.api.delete_resources(publicKeyArray);
    console.log(res);
    return res;
  } catch (error) {
    console.log("Destroy error", error);
  }
};

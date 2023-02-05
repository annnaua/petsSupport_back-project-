const cloudinary = require('cloudinary').v2;

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
  secure: true,
});

const uploadImage = async (imagePath, options) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    return result;
  } catch (err) {
    console.log(err);
    console.log(err.message);
  }
};

const removeImageFromCloud = async (imageId, options) => {
  try {
    const result = await cloudinary.uploader.destroy(imageId, options);
    return result;
  } catch (err) {
    console.log(err);
    console.log(err.message);
  }
};

const parseIdFromImageURL = imageURL => {
  const [imageId] = imageURL
    .split('/')
    .find((_, idx, arr) => idx === arr.length - 1)
    .split('.');
  return imageId;
};

module.exports = {
  uploadImage,
  parseIdFromImageURL,
  removeImageFromCloud,
};

const {
  pet: { Pet },
} = require('../../models');
const { HttpError } = require('../../helpers');
const {
  removeImageFromCloud,
  parseIdFromImageURL,
} = require('../../services/cloud');

const removePet = async (req, res) => {
  const { petId } = req.params;
  const { _id: owner } = req.user;

  const result = await Pet.findOneAndRemove({ owner, _id: petId });

  if (!result) {
    throw HttpError(404, `Pet with id ${petId} not found`);
  }

  const imageId = parseIdFromImageURL(result.photoURL);

  await removeImageFromCloud(imageId);

  res.json({
    status: 'Success',
    code: 200,
    message: 'Pet was deleted',
  });
};

module.exports = removePet;

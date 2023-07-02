const { Reviews } = require("../models/reviews.models");
const { catchAsync } = require("../utils/catchAsync.utils");

const createReview = catchAsync(async (req, res) => {
  const { restaurantId } = req.params;
  const userId = req.sessionUser.id;
  const { rating, comment } = req.body;

  const newReview = await Reviews.create({
    userId, //Must to come from token
    restaurantId,
    rating,
    comment,
  });
  res.status(202).json({
    status: "Success",
    data: newReview,
  });
});

const updateReview = catchAsync(async (req, res) => {
  const { rating, comment } = req.body;

  const { id, restaurantId } = req.params;

  const reviewToUpdate = await Reviews.findOne({
    where: { id, restaurantId: restaurantId },
  });

  const updatedReview = await reviewToUpdate.update({ rating, comment });
  res.status(202).json({
    status: "Success",
    data: updatedReview,
  });
});

const deleteReview = catchAsync(async (req, res) => {
  const { id, restaurantId } = req.params;
  const ReviewToDelete = await Reviews.findOne({
    where: { id, restaurantId: restaurantId },
  });
  await ReviewToDelete.update({ status: "deleted" });
  res.status(202).json({
    status: "Review has been deleted 🙂",
  });
});

module.exports = { createReview, updateReview, deleteReview };

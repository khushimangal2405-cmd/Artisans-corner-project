const Review = require("../models/Review");

// Add Review
const addReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);

    res.status(201).json({
      message: "Review Added Successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Reviews by Product
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId,
    });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addReview,
  getReviews,
};
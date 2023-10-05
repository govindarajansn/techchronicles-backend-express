import Rating from "../models/Rating.js";

export const submitRating = async (req, res) => {
  try {
    const { companyBlogId, ratingValue, review } = req.body;
    const userId = req.userId; // Assuming this value is set after JWT verification

    // Check if the user already rated the blog
    const existingRating = await Rating.findOne({
      where: { blog_id: companyBlogId, user_id: userId }
    });

    if (existingRating) {
      return res
        .status(400)
        .json({ message: "You've already rated this blog." });
    }

    // Create a new rating
    await Rating.create({
      rating: ratingValue,
      blog_id: companyBlogId,
      user_id: userId,
      review_text: review
    });

    res.status(200).json({ message: "Rating submitted successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Error while submitting the rating.",
      error: error.message
    });
  }
};

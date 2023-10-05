export const checkDecodedUserId = (req, res) => {
  if (req.userId) {
    res.status(200).json({
      message: "User ID decoded successfully!",
      userId: req.userId
    });
  } else {
    res.status(400).json({
      message: "Failed to decode user ID."
    });
  }
};

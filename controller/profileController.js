import Profile from "../models/Profile.js";

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const updates = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      image_url: req.body.image_url,
      github_url: req.body.github_url,
      linkedin_url: req.body.linkedin_url,
      description: req.body.description
    };

    Object.keys(updates).forEach(
      (key) => updates[key] === undefined && delete updates[key]
    );

    await Profile.update(updates, { where: { id: userId } });

    res.status(200).json({ message: "Profile updated successfully." });
  } catch (error) {
    res.status(500).json({
      message: "Error updating profile.",
      error: error.message
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    // Fetch user data using the ID provided by the authentication middleware
    const user = await Profile.findOne({ where: { id: req.userId } });

    // If user not found
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Return user data. Consider omitting sensitive data.
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching user profile.",
      error: error.message
    });
  }
};

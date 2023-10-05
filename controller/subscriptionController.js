import Subscription from "../models/Subscription.js";

export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    const userId = req.userId;
    console.log(userId);

    const existingSubscription = await Subscription.findOne({
      where: { user_id: userId }
    });

    if (existingSubscription) {
      return res.status(400).json({ message: "You are already subscribed." });
    }

    const newSubscription = await Subscription.create({
      user_id: userId,
      email
    });

    res.status(201).json({
      message: "Subscription successful.",
      subscription: newSubscription
    });
  } catch (error) {
    res.status(500).json({
      message: "Error subscribing.",
      error: error.message
    });
  }
};

export const unSubscribe = async (req, res) => {
  try {
    const userId = req.userId;

    const existingSubscription = await Subscription.findOne({
      where: { user_id: userId }
    });

    if (!existingSubscription) {
      return res.status(400).json({ message: "You are not subscribed." });
    }

    await existingSubscription.destroy();

    res.status(200).json({
      message: "Unsubscribed successfully."
    });
  } catch (error) {
    res.status(500).json({
      message: "Error unsubscribing.",
      error: error.message
    });
  }
};

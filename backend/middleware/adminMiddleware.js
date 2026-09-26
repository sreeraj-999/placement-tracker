const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
  try {
    // Make sure authentication has already happened
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    // Find the logged-in user
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check admin role
    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Admin access required",
      });
    }

    // Store user information for later routes
    req.admin = user;

    next();
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error while checking admin access",
    });
  }
};

module.exports = adminMiddleware;
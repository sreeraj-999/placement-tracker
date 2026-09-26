const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        message: "No Token Found",
      });
    }

    const decoded = jwt.verify(
      token,
      "placementtrackersecret"
    );

    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = authMiddleware;
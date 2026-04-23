const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  // 1. Check if the Authorization header exists
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "No token provided. Access denied." });
  }

  // 2. Extract the token (header looks like "Bearer eyJhbG...")
  const token = authHeader.split(" ")[1];

  try {
    // 3. Verify the token using our secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach the decoded user info to the request object
    // Now any route handler can access req.user
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only." });
  }
  next();
};

module.exports = { protect, adminOnly };

exports.isAdmin = (req, res, next) => {
  // Check if user is logged in AND has admin role
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: "Access denied. Admins only.",
  });
};

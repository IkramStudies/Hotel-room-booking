exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // User is logged in, proceed to the history
  }
  res.status(401).json({ message: "Please log in to view your bookings" });
};

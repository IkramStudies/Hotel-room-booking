// Success callback after Google Auth
exports.googleAuthSuccess = (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "User Authenticated",
      user: req.user,
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Not Authorized",
    });
  }
};

// Logout logic
exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("http://localhost:5173/"); // Redirect back to React frontend
  });
};

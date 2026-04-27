const User = require("../models/User");
const bcrypt = require("bcryptjs");
const transporter = require("../config/mail");

// 1. REGISTER: Create user and send OTP
exports.register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if user exists and is already verified
    let user = await User.findOne({ email });
    if (user && user.isVerified) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User already exists. Please login.",
        });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 mins

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save or Update temporary user info
    // This allows users to request a new OTP if the first one expired
    user = await User.findOneAndUpdate(
      { email },
      {
        name: fullName,
        password: hashedPassword,
        otp,
        otpExpires,
        isVerified: false, // Ensure they aren't verified yet
      },
      { upsert: true, new: true },
    );

    // Send the Email
    await transporter.sendMail({
      from: `"StayEase Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your StayEase Verification Code",
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #2563EB;">Welcome to StayEase!</h2>
          <p>Thank you for registering. Use the code below to verify your email address:</p>
          <h1 style="background: #f4f4f4; padding: 10px; text-align: center; letter-spacing: 5px;">${otp}</h1>
          <p>This code <b>expires in 10 minutes</b>.</p>
          <p>If you did not request this, please ignore this email.</p>
        </div>
      `,
    });

    res
      .status(200)
      .json({ success: true, message: "OTP sent to email successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. VERIFY: Confirm OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({
      email,
      otp,
      otpExpires: { $gt: Date.now() }, // Check if not expired
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    // Update user status
    user.isVerified = true;
    user.otp = undefined; // Clear the OTP fields
    user.otpExpires = undefined;
    await user.save();

    // Automatically log them in after verification
    req.login(user, (err) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Verification successful, but login failed." });

      // Don't send password/otp back to frontend
      const { password, otp, otpExpires, ...userData } = user._doc;
      return res
        .status(200)
        .json({
          success: true,
          message: "Account verified and logged in!",
          user: userData,
        });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. LOGIN: Manual sign-in
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.password) {
      return res
        .status(400)
        .json({ message: "User not found. Please register." });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        message: "Your email is not verified.",
        needsVerification: true, // Frontend can use this to redirect to OTP page
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Passport Session Login
    req.login(user, (err) => {
      if (err)
        return res
          .status(500)
          .json({ message: "Login failed during session creation" });

      const { password, otp, otpExpires, ...userData } = user._doc;
      return res.status(200).json({ success: true, user: userData });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. GOOGLE SUCCESS & LOGOUT
exports.googleAuthSuccess = (req, res) => {
  if (req.user) {
    // Sanitize user data
    const { password, otp, ...userData } = req.user._doc || req.user;
    res.status(200).json({ success: true, user: userData });
  } else {
    res.status(401).json({ success: false, message: "Not authenticated" });
  }
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  });
};

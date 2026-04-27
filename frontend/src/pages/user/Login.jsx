import React, { useState } from "react";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isOtpStage, setIsOtpStage] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  const handleAuthAction = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Logging in...");
    } else if (!isOtpStage) {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      setIsOtpStage(true);
    } else {
      if (otp === "123456") setIsSuccess(true);
      else alert("Invalid OTP");
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] p-12 text-center shadow-2xl shadow-blue-100 border border-gray-100">
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={44} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-2">Verified!</h2>
          <p className="text-gray-500 mb-8 font-medium">
            Your account is ready. Welcome to StayEase.
          </p>
          <button
            onClick={() => {
              setIsSuccess(false);
              setIsLogin(true);
              setIsOtpStage(false);
            }}
            className="w-full py-4 bg-[#2563EB] text-white rounded-2xl font-bold hover:bg-[#1d4ed8] transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100 border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="p-8 pb-4 text-center">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            {isOtpStage ? "Verify " : isLogin ? "Welcome " : "Join "}
            <span className="text-[#2563EB]">StayEase</span>
          </h1>
          <p className="text-gray-400 mt-2 text-sm font-medium">
            {isOtpStage
              ? "Check your email for the code."
              : "Luxury stays, simplified."}
          </p>
        </div>

        <div className="p-8 pt-4">
          <form className="space-y-4" onSubmit={handleAuthAction}>
            {isOtpStage ? (
              <div className="space-y-6">
                <div className="relative">
                  <ShieldCheck
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    maxLength="6"
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent focus:border-[#2563EB] focus:bg-white rounded-2xl outline-none transition-all font-black tracking-[0.5em] text-center text-lg text-gray-700"
                  />
                </div>
                <button className="w-full py-4 bg-[#2563EB] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#1d4ed8] shadow-lg shadow-blue-100">
                  Verify OTP <ArrowRight size={18} />
                </button>
              </div>
            ) : (
              <>
                {!isLogin && (
                  <div className="relative">
                    <User
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      name="fullName"
                      onChange={handleInputChange}
                      type="text"
                      placeholder="Full Name"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent focus:border-[#2563EB] focus:bg-white border rounded-2xl outline-none transition-all font-medium"
                    />
                  </div>
                )}
                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    name="email"
                    onChange={handleInputChange}
                    type="email"
                    placeholder="Email Address"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent focus:border-[#2563EB] focus:bg-white border rounded-2xl outline-none transition-all font-medium"
                  />
                </div>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    name="password"
                    onChange={handleInputChange}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full pl-12 pr-12 py-4 bg-gray-50 border-transparent focus:border-[#2563EB] focus:bg-white border rounded-2xl outline-none transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2563EB] transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {!isLogin && (
                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      name="confirmPassword"
                      onChange={handleInputChange}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      className="w-full pl-12 pr-12 py-4 bg-gray-50 border-transparent focus:border-[#2563EB] focus:bg-white border rounded-2xl outline-none transition-all font-medium"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#2563EB] transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                )}

                <button className="w-full py-4 bg-[#2563EB] text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#1d4ed8] transition-all shadow-lg shadow-blue-200 mt-2">
                  {isLogin ? "Login" : "Register"} <ArrowRight size={18} />
                </button>

                {/* --- GOOGLE LOGIN SECTION AT THE BOTTOM --- */}
                <div className="relative flex items-center justify-center my-6">
                  <div className="border-t border-gray-100 w-full"></div>
                  <span className="bg-white px-4 text-[10px] text-gray-300 uppercase font-bold tracking-[0.2em] absolute">
                    Or continue with
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 py-3.5 rounded-2xl font-bold text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-[0.98]"
                >
                  <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  Google
                </button>
              </>
            )}
          </form>

          {!isOtpStage && (
            <p className="text-center mt-8 text-sm text-gray-400 font-medium">
              {isLogin ? "Don't have an account?" : "Already a member?"}{" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#2563EB] font-black hover:underline ml-1"
              >
                {isLogin ? "Sign Up" : "Log In"}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../styles/pages/__auth.css";
import authLogo from "../assets/auth.jpg";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, register, isAuthenticated, userRole } = useAuth();
  const [activeTab, setActiveTab] = useState("signin");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Set active tab based on URL
    if (location.pathname === "/signup") {
      setActiveTab("signup");
    } else {
      setActiveTab("signin");
    }
  }, [location.pathname]);

  useEffect(() => {
    // Redirect if already authenticated based on role
    if (isAuthenticated) {
      if (userRole === "pt") {
        navigate("/pt-home");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, userRole, navigate]);

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [rememberMe, setRememberMe] = useState(false);

  const handleSignInChange = (e) => {
    const { name, value } = e.target;
    setSignInData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await login(signInData.email, signInData.password);

    if (result.success) {
      // Redirect based on user role
      if (result.user?.role === "pt") {
        navigate("/pt-home");
      } else {
        navigate("/");
      }
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (signUpData.password !== signUpData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      setIsLoading(false);
      return;
    }

    const result = await register(
      signUpData.name,
      signUpData.email,
      signUpData.password
    );

    if (result.success) {
      // Redirect based on user role
      if (result.user?.role === "pt") {
        navigate("/pt-home");
      } else {
        navigate("/");
      }
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return (
    <div className="auth_page">
      <div className="auth_container">
        {/* Logo Section - Changes position based on active tab */}
        <div
          className={`auth_logo_section ${
            activeTab === "signup" ? "logo_right" : "logo_left"
          }`}
        >
          <div className="logo_container">
            <img
              src={authLogo}
              alt="VibeVita Logo"
              className="auth_logo_image"
            />
            <span className="auth_logo_text">VibeVita</span>
          </div>
        </div>

        {/* Form Section - Changes position based on active tab */}
        <div
          className={`auth_form_section ${
            activeTab === "signup" ? "form_left" : "form_right"
          }`}
        >
          {/* Tab Buttons */}
          <div className="auth_tabs">
            <button
              className={`tab_button ${
                activeTab === "signin" ? "tab_active" : "tab_inactive"
              }`}
              onClick={() => setActiveTab("signin")}
            >
              SIGN IN
            </button>
            <button
              className={`tab_button ${
                activeTab === "signup" ? "tab_active" : "tab_inactive"
              }`}
              onClick={() => setActiveTab("signup")}
            >
              SIGN UP
            </button>
          </div>

          {/* Error Message */}
          {error && <div className="error_message">{error}</div>}

          {/* Sign In Form */}
          {activeTab === "signin" && (
            <form onSubmit={handleSignInSubmit} className="auth_form">
              {/* Email Input */}
              <div className="input_group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={signInData.email}
                  onChange={handleSignInChange}
                  className="auth_input"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="input_group">
                <input
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  value={signInData.password}
                  onChange={handleSignInChange}
                  className="auth_input"
                  required
                />
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="remember_forgot_section">
                <label className="remember_checkbox">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  <span className="remember_text">Nhớ mật khẩu</span>
                </label>

                <a href="#" className="forgot_password">
                  Bạn quên mật khẩu?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="auth_submit_button"
                disabled={isLoading}
              >
                {isLoading ? "ĐANG XỬ LÝ..." : "ĐĂNG NHẬP"}
              </button>
            </form>
          )}

          {/* Sign Up Form */}
          {activeTab === "signup" && (
            <form onSubmit={handleSignUpSubmit} className="auth_form">
              {/* Name Input */}
              <div className="input_group">
                <input
                  type="text"
                  name="name"
                  placeholder="Tên"
                  value={signUpData.name}
                  onChange={handleSignUpChange}
                  className="auth_input"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="input_group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={signUpData.email}
                  onChange={handleSignUpChange}
                  className="auth_input"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="input_group">
                <input
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  value={signUpData.password}
                  onChange={handleSignUpChange}
                  className="auth_input"
                  required
                />
              </div>

              {/* Confirm Password Input */}
              <div className="input_group">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Nhập lại mật khẩu"
                  value={signUpData.confirmPassword}
                  onChange={handleSignUpChange}
                  className="auth_input"
                  required
                />
              </div>

              {/* Remember Me Checkbox */}
              <div className="remember_section">
                <label className="remember_checkbox">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  <span className="remember_text">Nhớ mật khẩu</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="auth_submit_button"
                disabled={isLoading}
              >
                {isLoading ? "ĐANG XỬ LÝ..." : "ĐĂNG KÍ"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;

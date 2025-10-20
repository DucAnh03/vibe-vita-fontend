import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";

const RoleBasedRedirect = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // ✅ Điều hướng theo vai trò
    switch (user.role) {
      case "admin":
        navigate("/admin");
        break;
      case "pt":
        navigate("/pt-home");
        break;
      default:
        navigate("/");
        break;
    }
  }, [user, navigate]);

  return null; // Không render gì, chỉ điều hướng
};

export default RoleBasedRedirect;

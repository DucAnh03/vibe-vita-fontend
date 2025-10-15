// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/pages/PaymentSuccess.css";

// export default function PaymentSuccess() {
//   const navigate = useNavigate();
//   const [verified, setVerified] = useState(false);

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const orderCode = params.get("orderCode");
//     const status = params.get("status");
//     const trainerId = localStorage.getItem("selectedTrainer");
//     const token = localStorage.getItem("token");

//     // ✅ Lấy thông tin user đang đăng nhập
//     const currentUser = JSON.parse(localStorage.getItem("user"));
//     const userId = currentUser?._id || currentUser?.id;
//     const paidKey = `paidPTs_${userId}`; // mỗi user có danh sách PT riêng

//     if (orderCode && status === "PAID" && token) {
//       // ✅ Gọi API xác minh thanh toán PayOS
//       fetch(`http://localhost:5000/api/payment/status/${orderCode}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//         .then((res) => res.json())
//         .then(async (data) => {
//           if (data.success) {
//             setVerified(true);

//             // ✅ Cập nhật lại user (để refresh isPremium = true)
//             try {
//               const userRes = await fetch("http://localhost:5000/api/auth/me", {
//                 headers: { Authorization: `Bearer ${token}` },
//               });
//               const userData = await userRes.json();
//               if (userData?.user) {
//                 localStorage.setItem("user", JSON.stringify(userData.user));
//               }
//             } catch (err) {
//               console.error("❌ Lỗi lấy lại thông tin user:", err);
//             }

//             // ✅ Lưu danh sách PT đã thanh toán (theo từng user)
//             if (trainerId && userId) {
//               const paidPTs = JSON.parse(localStorage.getItem(paidKey)) || [];
//               if (!paidPTs.includes(trainerId)) {
//                 paidPTs.push(trainerId);
//                 localStorage.setItem(paidKey, JSON.stringify(paidPTs));
//               }
//             }

//             // ⏳ Sau 3 giây → quay về trang đặt lịch PT vừa chọn
//             setTimeout(() => {
//               if (trainerId) {
//                 navigate(`/trainers/${trainerId}`);
//                 localStorage.removeItem("selectedTrainer");
//               } else {
//                 navigate("/list-trainers");
//               }
//             }, 3000);
//           }
//         })
//         .catch((err) => console.error("❌ Lỗi xác minh thanh toán:", err));
//     }
//   }, [navigate]);

//   return (
//     <div className="payment-result-container">
//       <div className="payment-card success">
//         <h1>✅ Thanh toán thành công!</h1>
//         <p>Bạn đã được nâng cấp Premium 🎉</p>

//         <p>
//           {verified
//             ? "Xác nhận thành công! Hệ thống đang chuyển bạn đến trang đặt lịch..."
//             : "Đang xác minh thanh toán, vui lòng chờ..."}
//         </p>

//         <button
//           className="payment-btn"
//           onClick={() =>
//             navigate(
//               localStorage.getItem("selectedTrainer")
//                 ? `/trainers/${localStorage.getItem("selectedTrainer")}`
//                 : "/list-trainers"
//             )
//           }
//         >
//           Đến trang PT
//         </button>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/PaymentSuccess.css";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);

  // ✅ Lấy URL backend từ biến môi trường (.env)
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderCode = params.get("orderCode");
    const status = params.get("status");
    const trainerId = localStorage.getItem("selectedTrainer");
    const token = localStorage.getItem("token");

    // ✅ Lấy thông tin user hiện tại
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const userId = currentUser?._id || currentUser?.id;
    const paidKey = `paidPTs_${userId}`; // mỗi user có danh sách PT riêng

    if (orderCode && status === "PAID" && token) {
      // ✅ Gọi API xác minh thanh toán PayOS (Render backend)
      fetch(`${API_URL}/api/payment/status/${orderCode}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then(async (data) => {
          if (data.success) {
            setVerified(true);

            // ✅ Lấy lại thông tin user sau thanh toán
            try {
              const userRes = await fetch(`${API_URL}/api/auth/me`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              const userData = await userRes.json();
              if (userData?.user) {
                localStorage.setItem("user", JSON.stringify(userData.user));
              }
            } catch (err) {
              console.error("❌ Lỗi lấy lại thông tin user:", err);
            }

            // ✅ Lưu danh sách PT đã thanh toán (riêng từng user)
            if (trainerId && userId) {
              const paidPTs = JSON.parse(localStorage.getItem(paidKey)) || [];
              if (!paidPTs.includes(trainerId)) {
                paidPTs.push(trainerId);
                localStorage.setItem(paidKey, JSON.stringify(paidPTs));
              }
            }

            // ⏳ Sau 3s → quay về trang PT vừa chọn
            setTimeout(() => {
              if (trainerId) {
                navigate(`/trainers/${trainerId}`);
                localStorage.removeItem("selectedTrainer");
              } else {
                navigate("/list-trainers");
              }
            }, 3000);
          }
        })
        .catch((err) => console.error("❌ Lỗi xác minh thanh toán:", err));
    }
  }, [navigate, API_URL]);

  return (
    <div className="payment-result-container">
      <div className="payment-card success">
        <h1>✅ Thanh toán thành công!</h1>
        <p>Bạn đã được nâng cấp Premium 🎉</p>

        <p>
          {verified
            ? "Xác nhận thành công! Hệ thống đang chuyển bạn đến trang đặt lịch..."
            : "Đang xác minh thanh toán, vui lòng chờ..."}
        </p>

        <button
          className="payment-btn"
          onClick={() =>
            navigate(
              localStorage.getItem("selectedTrainer")
                ? `/trainers/${localStorage.getItem("selectedTrainer")}`
                : "/list-trainers"
            )
          }
        >
          Đến trang PT
        </button>
      </div>
    </div>
  );
}

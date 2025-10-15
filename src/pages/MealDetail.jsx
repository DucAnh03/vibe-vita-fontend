// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import "../styles/pages/__home.css";

// const MealDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [meal, setMeal] = useState(null);

//   useEffect(() => {
//     const fetchDetail = async () => {
//       try {
//         setLoading(true);
//         setError("");
//         const token = localStorage.getItem("token");
//         const res = await fetch("http://localhost:5000/api/meal/detail", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//           body: JSON.stringify({ id }),
//         });
//         const data = await res.json();
//         if (!res.ok) throw new Error(data?.message || "Lỗi gọi API");
//         setMeal(data?.data?.meal || null);
//       } catch (err) {
//         setError(err.message || "Đã xảy ra lỗi");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDetail();
//   }, [id]);

//   return (
//     <div className="app_home d-flex flex-column">
//       <div className="app_home_container">
//         {loading && <div className="ws_error">Đang tải...</div>}
//         {error && <div className="ws_error">{error}</div>}

//         {meal && (
//           <div className="meal_detail_wrapper">
//             <button className="meal_back_btn" onClick={() => navigate(-1)}>
//               ⬅
//             </button>

//             <div className="meal_detail_card">
//               <div className="meal_detail_left">
//                 {meal.anh && (
//                   <img
//                     className="meal_detail_image"
//                     src={meal.anh}
//                     alt={meal.ten_mon_an}
//                   />
//                 )}
//                 <div className="meal_detail_info">
//                   <h2 className="meal_detail_name">
//                     {meal.ten_mon_an?.toUpperCase()}
//                   </h2>
//                   <ul className="meal_detail_stats">
//                     <li>180-220 KCAL</li>
//                     <li>{meal.thoi_gian_nau_phut} PHÚT</li>
//                     <li>{(meal.muc_tieu || []).join("/ ").toUpperCase()}</li>
//                   </ul>
//                 </div>
//               </div>

//               <div className="meal_detail_divider"></div>

//               <div className="meal_detail_right">
//                 <div className="meal_section">
//                   <h3 className="meal_section_title">NGUYÊN LIỆU</h3>
//                   <ul className="meal_ingredients">
//                     {(meal.detail?.nguyen_lieu || []).map((item, i) => (
//                       <li key={i}>{item}</li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div className="meal_section">
//                   <h3 className="meal_section_title">CÁCH LÀM</h3>
//                   <ul className="meal_steps">
//                     {(meal.detail?.cach_lam || []).map((step, i) => (
//                       <li key={i}>{step}</li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MealDetail;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/pages/__home.css";

const MealDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [meal, setMeal] = useState(null);

  // ✅ Lấy URL backend từ biến môi trường (Render)
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_URL}/api/meal/detail`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({ id }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Lỗi gọi API");
        setMeal(data?.data?.meal || null);
      } catch (err) {
        setError(err.message || "Đã xảy ra lỗi");
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, API_URL]);

  return (
    <div className="app_home d-flex flex-column">
      <div className="app_home_container">
        {loading && <div className="ws_error">Đang tải...</div>}
        {error && <div className="ws_error">{error}</div>}

        {meal && (
          <div className="meal_detail_wrapper">
            <button className="meal_back_btn" onClick={() => navigate(-1)}>
              ⬅
            </button>

            <div className="meal_detail_card">
              <div className="meal_detail_left">
                {meal.anh && (
                  <img
                    className="meal_detail_image"
                    src={
                      meal.anh.startsWith("http")
                        ? meal.anh
                        : `${API_URL}${meal.anh}`
                    }
                    alt={meal.ten_mon_an}
                  />
                )}
                <div className="meal_detail_info">
                  <h2 className="meal_detail_name">
                    {meal.ten_mon_an?.toUpperCase()}
                  </h2>
                  <ul className="meal_detail_stats">
                    <li>180-220 KCAL</li>
                    <li>{meal.thoi_gian_nau_phut} PHÚT</li>
                    <li>{(meal.muc_tieu || []).join("/ ").toUpperCase()}</li>
                  </ul>
                </div>
              </div>

              <div className="meal_detail_divider"></div>

              <div className="meal_detail_right">
                <div className="meal_section">
                  <h3 className="meal_section_title">NGUYÊN LIỆU</h3>
                  <ul className="meal_ingredients">
                    {(meal.detail?.nguyen_lieu || []).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="meal_section">
                  <h3 className="meal_section_title">CÁCH LÀM</h3>
                  <ul className="meal_steps">
                    {(meal.detail?.cach_lam || []).map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealDetail;

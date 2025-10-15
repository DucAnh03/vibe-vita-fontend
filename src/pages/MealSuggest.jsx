// import React, { useMemo, useState } from "react";
// import "../styles/pages/__home.css";

// const MealSuggest = () => {
//   const [gender, setGender] = useState("male");
//   const [goal, setGoal] = useState("TĂNG CƠ");
//   const [dayIndex, setDayIndex] = useState(1);
//   const [specialDiets, setSpecialDiets] = useState(["eatclean"]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [meals, setMeals] = useState({
//     bua_sang: [],
//     bua_trua: [],
//     bua_toi: [],
//   });

//   const goalLabel = useMemo(() => {
//     const map = {
//       "TĂNG CƠ": "Tăng cơ",
//       "GIẢM MỠ": "Giảm mỡ",
//       "GIỮ DÁNG": "Giữ dáng",
//       "PHỤC HỒI": "Phục hồi",
//     };
//     return map[goal] || goal;
//   }, [goal]);

//   const toggleDiet = (key) => {
//     setSpecialDiets((prev) =>
//       prev.includes(key) ? prev.filter((d) => d !== key) : [...prev, key]
//     );
//   };

//   const handleFetch = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const payload = {
//         muc_tieu: [goalLabel],
//         gioi_tinh_phu_hop: [gender === "male" ? "nam" : "nu"],
//         che_do_an_dac_biet: specialDiets,
//       };
//       const token = localStorage.getItem("token");
//       const res = await fetch("http://localhost:5000/api/meal/suggest-basic", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//         },
//         body: JSON.stringify(payload),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data?.message || "Lỗi gọi API");
//       setMeals({
//         bua_sang: data?.data?.bua_sang || [],
//         bua_trua: data?.data?.bua_trua || [],
//         bua_toi: data?.data?.bua_toi || [],
//       });
//     } catch (err) {
//       setError(err.message || "Đã xảy ra lỗi");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const Section = ({ title, items }) => {
//     if (!items || items.length === 0) return null;
//     return (
//       <div style={{ marginTop: 28 }}>
//         <h3 className="ws_heading" style={{ marginBottom: 16 }}>
//           {title}
//         </h3>
//         <ul className="meal_results">
//           {items.map((m) => (
//             <li key={m.id} className="meal_card">
//               {m.anh && (
//                 <div className="meal_card_image">
//                   <img src={m.anh} alt={m.ten_mon_an} />
//                 </div>
//               )}
//               <div className="meal_card_content">
//                 <h3 className="meal_card_title">
//                   {m.ten_mon_an?.toUpperCase()}
//                 </h3>

//                 <div className="meal_card_meta">
//                   <div className="meal_meta_item">
//                     <span className="meal_meta_icon">🏋️</span>
//                     <span>{(m.muc_tieu || []).join("/ ").toUpperCase()}</span>
//                   </div>
//                   <div className="meal_meta_item">
//                     <span className="meal_meta_icon">⏱</span>
//                     <span>{m.thoi_gian_nau_phut} PHÚT</span>
//                   </div>
//                   <div className="meal_meta_item">
//                     <span>
//                       {m.detail?.mo_ta || "CÓ THỂ NẤU TRƯỚC 2-3 PHẦN"}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="meal_card_stats">
//                   <span>❤️ ĐÃ THÍCH: {m.luot_thich || 0}</span>
//                   <span>🔖 ĐÃ LƯU: {m.luot_luu || 0}</span>
//                 </div>

//                 <div className="meal_card_actions">
//                   <button className="meal_action_btn">
//                     <span>📋</span>
//                     <span>GIÁ TRỊ DINH DƯỠNG</span>
//                   </button>
//                   <button
//                     className="meal_action_btn"
//                     onClick={() =>
//                       (window.location.href = `/suggest/meal/${m.id}`)
//                     }
//                   >
//                     <span>👨‍🍳</span>
//                     <span>CÔNG THỨC</span>
//                   </button>
//                   <button className="meal_action_btn">
//                     <span>🔄</span>
//                     <span>ĐỔI MÓN ĂN</span>
//                   </button>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };

//   return (
//     <div className="app_home d-flex flex-column">
//       <div className="app_home_container">
//         <div className="ws_container">
//           <div className="ws_left">
//             <div className="ws_icon">🍽️</div>
//             <h2 className="ws_title">THỰC ĐƠN GỢI Ý</h2>
//           </div>
//           <div className="ws_divider" />
//           <div className="ws_right">
//             <div className="ws_field">
//               <label className="ws_label">DÀNH CHO</label>
//               <div className="ws_segment">
//                 <button
//                   type="button"
//                   className={`ws_chip ${gender === "male" ? "active" : ""}`}
//                   onClick={() => setGender("male")}
//                 >
//                   👨 NAM
//                 </button>
//                 <button
//                   type="button"
//                   className={`ws_chip ${gender === "female" ? "active" : ""}`}
//                   onClick={() => setGender("female")}
//                 >
//                   👩 NỮ
//                 </button>
//               </div>
//             </div>

//             <div className="ws_field">
//               <label className="ws_label">MỤC TIÊU</label>
//               <select
//                 className="ws_select"
//                 value={goal}
//                 onChange={(e) => setGoal(e.target.value)}
//               >
//                 <option>TĂNG CƠ</option>
//                 <option>GIẢM MỠ</option>
//                 <option>GIỮ DÁNG</option>
//                 <option>PHỤC HỒI</option>
//               </select>
//             </div>

//             <div className="ws_field">
//               <label className="ws_label">XEM THỰC ĐƠN THEO</label>
//               <div className="ws_daylist">
//                 {[1, 2, 3, 4, 5, 6, 7].map((d) => (
//                   <button
//                     key={d}
//                     type="button"
//                     className={`ws_day ${dayIndex === d ? "active" : ""}`}
//                     onClick={() => setDayIndex(d)}
//                   >
//                     NGÀY {d}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="ws_field">
//               <label className="ws_label">CHẾ ĐỘ ĂN ĐẶC BIỆT</label>
//               <div className="ws_segment">
//                 {["eatclean", "keto", "lowcarb", "chaygym"].map((k) => (
//                   <button
//                     key={k}
//                     type="button"
//                     className={`ws_pill ${
//                       specialDiets.includes(k) ? "active" : ""
//                     }`}
//                     onClick={() => toggleDiet(k)}
//                   >
//                     {k.toUpperCase()}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="ws_actions">
//               <button
//                 className="ws_cta"
//                 onClick={handleFetch}
//                 disabled={loading}
//               >
//                 {loading ? "ĐANG TẢI..." : "XEM THỰC ĐƠN GỢI Ý"}
//               </button>
//             </div>
//           </div>
//         </div>

//         <h2 className="ws_heading">BỮA ĂN GỢI Ý</h2>
//         {error && <div className="ws_error">{error}</div>}

//         <Section title="BỮA SÁNG" items={meals.bua_sang} />
//         <Section title="BỮA TRƯA" items={meals.bua_trua} />
//         <Section title="BỮA TỐI" items={meals.bua_toi} />
//       </div>
//     </div>
//   );
// };

// export default MealSuggest;
import React, { useMemo, useState } from "react";
import "../styles/pages/__home.css";

const MealSuggest = () => {
  const [gender, setGender] = useState("male");
  const [goal, setGoal] = useState("TĂNG CƠ");
  const [dayIndex, setDayIndex] = useState(1);
  const [specialDiets, setSpecialDiets] = useState(["eatclean"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [meals, setMeals] = useState({
    bua_sang: [],
    bua_trua: [],
    bua_toi: [],
  });

  // ✅ Thống nhất với AuthContext - dùng process.env
  const API_URL = process.env.REACT_APP_API_URL;

  const goalLabel = useMemo(() => {
    const map = {
      "TĂNG CƠ": "Tăng cơ",
      "GIẢM MỠ": "Giảm mỡ",
      "GIỮ DÁNG": "Giữ dáng",
      "PHỤC HỒI": "Phục hồi",
    };
    return map[goal] || goal;
  }, [goal]);

  const toggleDiet = (key) => {
    setSpecialDiets((prev) =>
      prev.includes(key) ? prev.filter((d) => d !== key) : [...prev, key]
    );
  };

  // ✅ Gọi API (có xác thực)
  const handleFetch = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("⚠️ Bạn cần đăng nhập để xem gợi ý thực đơn!");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const payload = {
        muc_tieu: [goalLabel],
        gioi_tinh_phu_hop: [gender === "male" ? "nam" : "nu"],
        che_do_an_dac_biet: specialDiets,
      };

      console.log("🚀 Gửi request đến:", `${API_URL}/api/meal/suggest-basic`);
      console.log("📦 Payload:", payload);

      const res = await fetch(`${API_URL}/api/meal/suggest-basic`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // luôn có token
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("📥 Phản hồi:", data);

      if (!res.ok) throw new Error(data?.message || "Lỗi khi gọi API");

      setMeals({
        bua_sang: data?.data?.bua_sang || [],
        bua_trua: data?.data?.bua_trua || [],
        bua_toi: data?.data?.bua_toi || [],
      });
    } catch (err) {
      console.error("❌ Lỗi API:", err);
      setError(err.message || "Đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Component hiển thị bữa ăn
  const Section = ({ title, items }) => {
    if (!items || items.length === 0) return null;
    return (
      <div style={{ marginTop: 28 }}>
        <h3 className="ws_heading" style={{ marginBottom: 16 }}>
          {title}
        </h3>
        <ul className="meal_results">
          {items.map((m) => (
            <li key={m.id || m._id} className="meal_card">
              {m.anh && (
                <div className="meal_card_image">
                  <img
                    src={
                      m.anh.startsWith("http") ? m.anh : `${API_URL}${m.anh}`
                    }
                    alt={m.ten_mon_an}
                  />
                </div>
              )}
              <div className="meal_card_content">
                <h3 className="meal_card_title">
                  {m.ten_mon_an?.toUpperCase()}
                </h3>

                <div className="meal_card_meta">
                  <div className="meal_meta_item">
                    <span className="meal_meta_icon">🏋️</span>
                    <span>{(m.muc_tieu || []).join("/ ").toUpperCase()}</span>
                  </div>
                  <div className="meal_meta_item">
                    <span className="meal_meta_icon">⏱</span>
                    <span>{m.thoi_gian_nau_phut} PHÚT</span>
                  </div>
                  <div className="meal_meta_item">
                    <span>
                      {m.detail?.mo_ta || "CÓ THỂ NẤU TRƯỚC 2-3 PHẦN"}
                    </span>
                  </div>
                </div>

                <div className="meal_card_stats">
                  <span>❤️ ĐÃ THÍCH: {m.luot_thich || 0}</span>
                  <span>🔖 ĐÃ LƯU: {m.luot_luu || 0}</span>
                </div>

                <div className="meal_card_actions">
                  <button className="meal_action_btn">
                    <span>📋</span>
                    <span>GIÁ TRỊ DINH DƯỠNG</span>
                  </button>
                  <button
                    className="meal_action_btn"
                    onClick={() =>
                      (window.location.href = `/suggest/meal/${m.id || m._id}`)
                    }
                  >
                    <span>👨‍🍳</span>
                    <span>CÔNG THỨC</span>
                  </button>
                  <button className="meal_action_btn">
                    <span>🔄</span>
                    <span>ĐỔI MÓN ĂN</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // ✅ Render chính
  return (
    <div className="app_home d-flex flex-column">
      <div className="app_home_container">
        <div className="ws_container">
          <div className="ws_left">
            <div className="ws_icon">🍽️</div>
            <h2 className="ws_title">THỰC ĐƠN GỢI Ý</h2>
          </div>
          <div className="ws_divider" />
          <div className="ws_right">
            {/* Gender */}
            <div className="ws_field">
              <label className="ws_label">DÀNH CHO</label>
              <div className="ws_segment">
                <button
                  type="button"
                  className={`ws_chip ${gender === "male" ? "active" : ""}`}
                  onClick={() => setGender("male")}
                >
                  👨 NAM
                </button>
                <button
                  type="button"
                  className={`ws_chip ${gender === "female" ? "active" : ""}`}
                  onClick={() => setGender("female")}
                >
                  👩 NỮ
                </button>
              </div>
            </div>

            {/* Goal */}
            <div className="ws_field">
              <label className="ws_label">MỤC TIÊU</label>
              <select
                className="ws_select"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
              >
                <option>TĂNG CƠ</option>
                <option>GIẢM MỠ</option>
                <option>GIỮ DÁNG</option>
                <option>PHỤC HỒI</option>
              </select>
            </div>

            {/* Day */}
            <div className="ws_field">
              <label className="ws_label">XEM THỰC ĐƠN THEO</label>
              <div className="ws_daylist">
                {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                  <button
                    key={d}
                    type="button"
                    className={`ws_day ${dayIndex === d ? "active" : ""}`}
                    onClick={() => setDayIndex(d)}
                  >
                    NGÀY {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Diet */}
            <div className="ws_field">
              <label className="ws_label">CHẾ ĐỘ ĂN ĐẶC BIỆT</label>
              <div className="ws_segment">
                {["eatclean", "keto", "lowcarb", "chaygym"].map((k) => (
                  <button
                    key={k}
                    type="button"
                    className={`ws_pill ${
                      specialDiets.includes(k) ? "active" : ""
                    }`}
                    onClick={() => toggleDiet(k)}
                  >
                    {k.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Action */}
            <div className="ws_actions">
              <button
                className="ws_cta"
                onClick={handleFetch}
                disabled={loading}
              >
                {loading ? "ĐANG TẢI..." : "XEM THỰC ĐƠN GỢI Ý"}
              </button>
            </div>
          </div>
        </div>

        <h2 className="ws_heading">BỮA ĂN GỢI Ý</h2>
        {error && <div className="ws_error">{error}</div>}

        <Section title="BỮA SÁNG" items={meals.bua_sang} />
        <Section title="BỮA TRƯA" items={meals.bua_trua} />
        <Section title="BỮA TỐI" items={meals.bua_toi} />
      </div>
    </div>
  );
};

export default MealSuggest;

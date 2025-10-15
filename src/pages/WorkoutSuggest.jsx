// import React, { useMemo, useState } from "react";
// import "../styles/pages/__home.css";

// const WorkoutSuggest = () => {
//   const [gender, setGender] = useState("male");
//   const [goal, setGoal] = useState("TĂNG CƠ");
//   const [period, setPeriod] = useState({ day: true, week: false });
//   const [selectedDay, setSelectedDay] = useState(1);
//   const [mode, setMode] = useState("HOME");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [rawExercises, setRawExercises] = useState([]);

//   const goalLabel = useMemo(() => {
//     const map = {
//       "TĂNG CƠ": "Tăng cơ",
//       "GIẢM MỠ": "Giảm mỡ",
//       "GIỮ DÁNG": "Giữ dáng",
//       "PHỤC HỒI": "Phục hồi",
//     };
//     return map[goal] || goal;
//   }, [goal]);

//   const dayLabel = useMemo(() => {
//     const map = {
//       1: "Thứ 2",
//       2: "Thứ 3",
//       3: "Thứ 4",
//       4: "Thứ 5",
//       5: "Thứ 6",
//       6: "Thứ 7",
//       7: "Chủ nhật",
//     };
//     return map[selectedDay];
//   }, [selectedDay]);

//   const modeLabel = useMemo(() => {
//     const map = {
//       HOME: "tại nhà",
//       GYM: "phòng gym",
//       EQUIP: "có dụng cụ",
//       NO_EQUIP: "không có dụng cụ",
//     };
//     return map[mode];
//   }, [mode]);

//   const handleFetch = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const payload = {
//         muc_tieu: [goalLabel],
//         gioi_tinh_phu_hop: [gender === "male" ? "nam" : "nu"],
//         ngay_trong_tuan: period.day ? [dayLabel] : undefined,
//         hinh_thuc_tap: [modeLabel],
//       };

//       const token = localStorage.getItem("token");
//       const res = await fetch(
//         "http://localhost:5000/api/exercise/suggest-basic",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           },
//           body: JSON.stringify(payload),
//         }
//       );
//       const data = await res.json();
//       if (!res.ok)
//         throw new Error(
//           data?.message ||
//             (res.status === 401 ? "Không có token xác thực" : "Lỗi gọi API")
//         );
//       setRawExercises(data?.data?.exercises || []);
//     } catch (err) {
//       setError(err.message || "Đã xảy ra lỗi");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const exercises = useMemo(() => {
//     let list = rawExercises || [];
//     if (period.day && dayLabel) {
//       list = list.filter(
//         (ex) =>
//           Array.isArray(ex.ngay_trong_tuan) &&
//           ex.ngay_trong_tuan.includes(dayLabel)
//       );
//     }
//     if (modeLabel) {
//       const norm = (s) => (s || "").toString().toLowerCase();
//       list = list.filter(
//         (ex) =>
//           Array.isArray(ex.hinh_thuc_tap) &&
//           ex.hinh_thuc_tap.some((h) => norm(h) === norm(modeLabel))
//       );
//     }
//     return list;
//   }, [rawExercises, period.day, dayLabel, modeLabel]);

//   return (
//     <div className="app_home d-flex flex-column">
//       <div className="app_home_container">
//         <div className="ws_container">
//           <div className="ws_left">
//             <div className="ws_icon">🚴</div>
//             <h2 className="ws_title">BÀI TẬP GỢI Ý</h2>
//           </div>
//           <div className="ws_divider" />
//           <div className="ws_right">
//             {/* Gender */}
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

//             {/* Goal */}
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

//             {/* Period */}
//             <div className="ws_field">
//               <label className="ws_label">XEM BÀI TẬP THEO</label>
//               <div className="ws_checks">
//                 <label className="ws_check">
//                   <input
//                     type="checkbox"
//                     checked={period.day}
//                     onChange={(e) =>
//                       setPeriod({ ...period, day: e.target.checked })
//                     }
//                   />
//                   <span>NGÀY</span>
//                 </label>
//                 <label className="ws_check">
//                   <input
//                     type="checkbox"
//                     checked={period.week}
//                     onChange={(e) =>
//                       setPeriod({ ...period, week: e.target.checked })
//                     }
//                   />
//                   <span>TUẦN</span>
//                 </label>
//               </div>
//             </div>

//             {period.day && (
//               <div className="ws_field">
//                 <span className="ws_label" />
//                 <div className="ws_daylist">
//                   {[1, 2, 3, 4, 5, 6, 7].map((d) => (
//                     <button
//                       key={d}
//                       type="button"
//                       className={`ws_day ${selectedDay === d ? "active" : ""}`}
//                       onClick={() => setSelectedDay(d)}
//                     >
//                       NGÀY {d}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Mode */}
//             <div className="ws_field">
//               <label className="ws_label">HÌNH THỨC TẬP</label>
//               <div className="ws_segment">
//                 {[
//                   { key: "HOME", label: "TẠI NHÀ" },
//                   { key: "GYM", label: "TẠI PHÒNG GYM" },
//                   { key: "EQUIP", label: "CÓ DỤNG CỤ" },
//                   { key: "NO_EQUIP", label: "KHÔNG DỤNG CỤ" },
//                 ].map((m) => (
//                   <button
//                     key={m.key}
//                     type="button"
//                     className={`ws_pill ${mode === m.key ? "active" : ""}`}
//                     onClick={() => setMode(m.key)}
//                   >
//                     {m.label}
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
//                 {loading ? "ĐANG TẢI..." : "XEM BÀI TẬP GỢI Ý"}
//               </button>
//             </div>
//           </div>
//         </div>

//         <h2 className="ws_heading">BÀI TẬP GỢI Ý</h2>

//         {error && <div className="ws_error">{error}</div>}

//         {exercises?.length > 0 && (
//           <ul className="ws_results">
//             {exercises.map((ex) => (
//               <li key={ex.id} className="ws_result_card">
//                 {ex.anh && (
//                   <div className="ws_card_image">
//                     <img src={ex.anh} alt={ex.ten_bai_tap} />
//                   </div>
//                 )}
//                 <div className="ws_card_content">
//                   <h3 className="ws_card_title">
//                     {ex.ten_bai_tap?.toUpperCase()} – {ex.thoi_gian_phut} PHÚT
//                   </h3>

//                   {ex.mo_ta && <p className="ws_card_desc">{ex.mo_ta}</p>}

//                   <div className="ws_card_info_grid">
//                     <div className="ws_info_item">
//                       <div className="ws_info_icon">🎯</div>
//                       <span>
//                         {(ex.muc_tieu || []).join("/ ").toUpperCase()}
//                       </span>
//                     </div>
//                     <div className="ws_info_item">
//                       <div className="ws_info_icon">⏱</div>
//                       <span>{ex.thoi_gian_phut} PHÚT</span>
//                     </div>
//                     <div className="ws_info_item">
//                       <div className="ws_info_icon">🏋️</div>
//                       <span>{(ex.do_kho || "Trung bình").toUpperCase()}</span>
//                     </div>
//                     <div className="ws_info_item">
//                       <div className="ws_info_icon">🏠</div>
//                       <span>
//                         {(ex.hinh_thuc_tap || []).join("/ ").toUpperCase()}
//                       </span>
//                     </div>
//                   </div>

//                   <div className="ws_card_stats">
//                     <span>❤️ ĐÃ THÍCH: {ex.luot_thich || 0}</span>
//                     <span>🔖 ĐÃ LƯU: {ex.luot_luu || 0}</span>
//                   </div>

//                   <div className="ws_card_actions">
//                     <button className="ws_action_btn">
//                       <span>📄</span>
//                       <span>CHI TIẾT BÀI TẬP</span>
//                     </button>
//                     <button className="ws_action_btn">
//                       <span>🔄</span>
//                       <span>ĐỔI BÀI TẬP</span>
//                     </button>
//                     <button className="ws_action_btn">
//                       <span>🔥</span>
//                       <span>TÍNH CALO TIÊU THỤ</span>
//                     </button>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WorkoutSuggest;
import React, { useMemo, useState } from "react";
import "../styles/pages/__home.css";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

const WorkoutSuggest = () => {
  const [gender, setGender] = useState("male");
  const [goal, setGoal] = useState("TĂNG CƠ");
  const [period, setPeriod] = useState({ day: true, week: false });
  const [selectedDay, setSelectedDay] = useState(1);
  const [mode, setMode] = useState("HOME");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rawExercises, setRawExercises] = useState([]);

  const goalLabel = useMemo(() => {
    const map = {
      "TĂNG CƠ": "Tăng cơ",
      "GIẢM MỠ": "Giảm mỡ",
      "GIỮ DÁNG": "Giữ dáng",
      "PHỤC HỒI": "Phục hồi",
    };
    return map[goal] || goal;
  }, [goal]);

  const dayLabel = useMemo(() => {
    const map = {
      1: "Thứ 2",
      2: "Thứ 3",
      3: "Thứ 4",
      4: "Thứ 5",
      5: "Thứ 6",
      6: "Thứ 7",
      7: "Chủ nhật",
    };
    return map[selectedDay];
  }, [selectedDay]);

  const modeLabel = useMemo(() => {
    const map = {
      HOME: "tại nhà",
      GYM: "phòng gym",
      EQUIP: "có dụng cụ",
      NO_EQUIP: "không có dụng cụ",
    };
    return map[mode];
  }, [mode]);

  // ✅ Gọi API gợi ý bài tập
  const handleFetch = async () => {
    try {
      setLoading(true);
      setError("");

      const payload = {
        muc_tieu: [goalLabel],
        gioi_tinh_phu_hop: [gender === "male" ? "nam" : "nu"],
        ngay_trong_tuan: period.day ? [dayLabel] : undefined,
        hinh_thuc_tap: [modeLabel],
      };

      const token = localStorage.getItem("token");

      const res = await fetch(`${API_BASE}/api/exercise/suggest-basic`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data?.message ||
            (res.status === 401
              ? "Không có token xác thực"
              : "Lỗi khi gọi API gợi ý bài tập")
        );
      }

      setRawExercises(data?.data?.exercises || []);
    } catch (err) {
      console.error("❌ Lỗi gợi ý bài tập:", err);
      setError(err.message || "Đã xảy ra lỗi không xác định");
    } finally {
      setLoading(false);
    }
  };

  const exercises = useMemo(() => {
    let list = rawExercises || [];
    if (period.day && dayLabel) {
      list = list.filter(
        (ex) =>
          Array.isArray(ex.ngay_trong_tuan) &&
          ex.ngay_trong_tuan.includes(dayLabel)
      );
    }
    if (modeLabel) {
      const norm = (s) => (s || "").toString().toLowerCase();
      list = list.filter(
        (ex) =>
          Array.isArray(ex.hinh_thuc_tap) &&
          ex.hinh_thuc_tap.some((h) => norm(h) === norm(modeLabel))
      );
    }
    return list;
  }, [rawExercises, period.day, dayLabel, modeLabel]);

  return (
    <div className="app_home d-flex flex-column">
      <div className="app_home_container">
        <div className="ws_container">
          <div className="ws_left">
            <div className="ws_icon">🚴</div>
            <h2 className="ws_title">BÀI TẬP GỢI Ý</h2>
          </div>
          <div className="ws_divider" />

          {/* Form chọn điều kiện */}
          <div className="ws_right">
            {/* Gender */}
            <div className="ws_field">
              <label className="ws_label">DÀNH CHO</label>
              <div className="ws_segment">
                <button
                  className={`ws_chip ${gender === "male" ? "active" : ""}`}
                  onClick={() => setGender("male")}
                >
                  👨 NAM
                </button>
                <button
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

            {/* Period */}
            <div className="ws_field">
              <label className="ws_label">XEM THEO</label>
              <div className="ws_checks">
                <label className="ws_check">
                  <input
                    type="checkbox"
                    checked={period.day}
                    onChange={(e) =>
                      setPeriod({ ...period, day: e.target.checked })
                    }
                  />
                  <span>NGÀY</span>
                </label>
                <label className="ws_check">
                  <input
                    type="checkbox"
                    checked={period.week}
                    onChange={(e) =>
                      setPeriod({ ...period, week: e.target.checked })
                    }
                  />
                  <span>TUẦN</span>
                </label>
              </div>
            </div>

            {period.day && (
              <div className="ws_field">
                <span className="ws_label" />
                <div className="ws_daylist">
                  {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                    <button
                      key={d}
                      className={`ws_day ${selectedDay === d ? "active" : ""}`}
                      onClick={() => setSelectedDay(d)}
                    >
                      NGÀY {d}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mode */}
            <div className="ws_field">
              <label className="ws_label">HÌNH THỨC TẬP</label>
              <div className="ws_segment">
                {[
                  { key: "HOME", label: "TẠI NHÀ" },
                  { key: "GYM", label: "PHÒNG GYM" },
                  { key: "EQUIP", label: "CÓ DỤNG CỤ" },
                  { key: "NO_EQUIP", label: "KHÔNG DỤNG CỤ" },
                ].map((m) => (
                  <button
                    key={m.key}
                    className={`ws_pill ${mode === m.key ? "active" : ""}`}
                    onClick={() => setMode(m.key)}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="ws_actions">
              <button
                className="ws_cta"
                onClick={handleFetch}
                disabled={loading}
              >
                {loading ? "ĐANG TẢI..." : "🔍 XEM BÀI TẬP GỢI Ý"}
              </button>
            </div>
          </div>
        </div>

        {/* Danh sách kết quả */}
        <h2 className="ws_heading">BÀI TẬP GỢI Ý</h2>

        {error && <div className="ws_error">{error}</div>}

        {exercises.length > 0 && (
          <ul className="ws_results">
            {exercises.map((ex) => (
              <li key={ex._id || ex.id} className="ws_result_card">
                {ex.anh && (
                  <div className="ws_card_image">
                    <img src={ex.anh} alt={ex.ten_bai_tap} />
                  </div>
                )}
                <div className="ws_card_content">
                  <h3 className="ws_card_title">
                    {ex.ten_bai_tap?.toUpperCase()} – {ex.thoi_gian_phut} PHÚT
                  </h3>

                  {ex.mo_ta && <p className="ws_card_desc">{ex.mo_ta}</p>}

                  <div className="ws_card_info_grid">
                    <div className="ws_info_item">
                      <div className="ws_info_icon">🎯</div>
                      <span>{(ex.muc_tieu || []).join("/ ")}</span>
                    </div>
                    <div className="ws_info_item">
                      <div className="ws_info_icon">⏱</div>
                      <span>{ex.thoi_gian_phut} PHÚT</span>
                    </div>
                    <div className="ws_info_item">
                      <div className="ws_info_icon">🏋️</div>
                      <span>{ex.do_kho || "Trung bình"}</span>
                    </div>
                    <div className="ws_info_item">
                      <div className="ws_info_icon">🏠</div>
                      <span>{(ex.hinh_thuc_tap || []).join("/ ")}</span>
                    </div>
                  </div>

                  <div className="ws_card_stats">
                    <span>❤️ {ex.luot_thich || 0} LƯỢT THÍCH</span>
                    <span>🔖 {ex.luot_luu || 0} ĐÃ LƯU</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {!loading && exercises.length === 0 && !error && (
          <div className="ws_empty">⚠️ Không có bài tập phù hợp.</div>
        )}
      </div>
    </div>
  );
};

export default WorkoutSuggest;

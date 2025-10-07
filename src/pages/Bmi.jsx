import React, { useState } from "react";
import "../styles/Bmi.css";
import { useNavigate } from "react-router-dom";

export default function BMI() {
  const navigate = useNavigate();
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState(""); // cm
  const [weight, setWeight] = useState(""); // kg
  const [result, setResult] = useState(null);

  const calcBMI = (e) => {
    e.preventDefault();

    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseInt(age, 10);

    if (!gender || !a || !h || !w || h <= 0 || w <= 0) {
      setResult({ error: "Vui lòng nhập đủ và hợp lệ các trường." });
      return;
    }

    const bmi = +(w / Math.pow(h / 100, 2)).toFixed(1);
    let status = "";
    if (bmi < 18.5) status = "Thiếu cân";
    else if (bmi < 23) status = "Bình thường";
    else if (bmi < 25) status = "Thừa cân";
    else status = "Béo phì";

    setResult({ bmi, status });
  };

  const openMenuSuggestion = () => {
    alert("Mở THỰC ĐƠN GỢI Ý (chưa gắn logic điều hướng).");
  };

  const openWorkoutSuggestion = () => {
    alert("Mở BÀI TẬP GỢI Ý (chưa gắn logic điều hướng).");
  };

  return (
    <div className="bmi-page">
      <h1 className="bmi-title">KIỂM TRA BMI CỦA BẠN</h1>
      {/* Form BMI */}
      <form className="bmi-card" onSubmit={calcBMI}>
        <label className="bmi-label">Your gender</label>
        <input
          className="bmi-input"
          type="text"
          placeholder="Male/Female"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />

        <label className="bmi-label">Your age</label>
        <input
          className="bmi-input"
          type="number"
          min="1"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <label className="bmi-label">Your height</label>
        <input
          className="bmi-input"
          type="number"
          min="1"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />

        <label className="bmi-label">Your weight</label>
        <input
          className="bmi-input"
          type="number"
          min="1"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />

        <button className="bmi-button" type="submit">
          CALCULATE
        </button>

        {result?.error && <p className="bmi-note error">{result.error}</p>}
        {result?.bmi && (
          <div className="bmi-result">
            <span>BMI:</span> <strong>{result.bmi}</strong> – {result.status}
          </div>
        )}
      </form>
      {/* Hai nút gợi ý nằm ngoài form */}
      {/* const navigate = useNavigate(); */}
      <div className="bmi-extra-buttons">
        <button
          type="button"
          className="outline-btn"
          onClick={() => navigate("/suggest/meal")}
        >
          XEM THỰC ĐƠN GỢI Ý
        </button>
        <button
          type="button"
          className="outline-btn"
          onClick={() => navigate("/suggest/workout")}
        >
          XEM BÀI TẬP GỢI Ý
        </button>
      </div>
    </div>
  );
}

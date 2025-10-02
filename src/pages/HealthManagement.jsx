import { useNavigate } from "react-router-dom";
import "../styles/HealthManagement.css";
import { NavLink } from "react-router-dom";
import calendar from "../assets/images/calendar.png";
import bmi from "../assets/images/bmi.png";
import suggestion from "../assets/images/suggestion.png";
function HealthManagement() {
  const navigate = useNavigate();

  return (
    <div className="health-management-container">
      <h1 className="page-title">QUẢN LÝ SỨC KHỎE</h1>

      <div className="health-cards">
        {/* Card Lịch */}
        <div className="health-card">
          <div className="card-image-container">
            <img src={calendar} alt="Lịch" className="card-image" />
          </div>
          <button className="card-button" onClick={() => navigate("/lich")}>
            LỊCH
          </button>
          <button className="detail-button" onClick={() => navigate("/lich")}>
            XEM THÊM
          </button>
        </div>

        {/* Card Chỉ số BMI */}
        <div className="health-card">
          <div className="card-image-container">
            <img src={bmi} alt="BMI" className="card-image" />
          </div>
          <button className="card-button" onClick={() => navigate("/bmi")}>
            CHỈ SỐ BMI
          </button>
          <button className="detail-button" onClick={() => navigate("/bmi")}>
            XEM THÊM
          </button>
        </div>

        {/* Card Gợi ý */}
        <div className="health-card">
          <div className="card-image-container">
            <img src={suggestion} alt="Gợi ý" className="card-image" />
          </div>
          <button className="card-button" onClick={() => navigate("/suggest")}>
            GỢI Ý
          </button>
          <button
            className="detail-button"
            onClick={() => navigate("/suggest")}
          >
            XEM THÊM
          </button>
        </div>
      </div>
    </div>
  );
}

export default HealthManagement;

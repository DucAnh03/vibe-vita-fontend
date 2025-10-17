import React from 'react'
import '../styles/pages/__home.css'
import suggestImg1 from '../assets/goiy1.jpg'
import suggestImg2 from '../assets/goiy2.jpg'

const Suggest = () => {
  return (
    <div className="app_home d-flex flex-column">
      <div className="app_home_container">
        <div className="app_home_suggestions" style={{ marginTop: 40 }}>
          <div
            className="suggestion_card"
            onClick={() => (window.location.href = '/suggest/meal')}
          >
            <img src={suggestImg1} alt="Gợi ý bữa ăn" />
            <div className="suggestion_overlay">
              <button className="suggestion_badge">GỢI Ý BỮA ĂN</button>
              <p>
                Gợi ý thực đơn cân bằng dinh dưỡng cho từng mục tiêu: giảm mỡ,
                tăng cơ hay ăn lành mạnh. Dễ nấu, dễ theo, không cần kiêng khắt
                khe. Ăn đủ – ăn đúng – giữ dáng bền vững mỗi ngày.
              </p>
              <button className="suggestion_btn">XEM THÊM</button>
            </div>
          </div>
          <div
            className="suggestion_card"
            onClick={() => (window.location.href = '/suggest/workout')}
          >
            <img src={suggestImg2} alt="Gợi ý bài tập" />
            <div className="suggestion_overlay">
              <button className="suggestion_badge">GỢI Ý BÀI TẬP</button>
              <p>
                Gợi ý bài tập mỗi ngày phù hợp với thể lực và mục tiêu cá nhân.
                Từ giảm cân, tăng cơ đến giữ dáng – bạn đều có lộ trình rõ ràng.
                Tập đúng cách, đúng nhịp – tạo vibe tập luyện riêng cho bạn.
              </p>
              <button className="suggestion_btn">XEM THÊM</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Suggest

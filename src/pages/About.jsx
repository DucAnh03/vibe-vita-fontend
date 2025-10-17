import React, { useState } from 'react'
import '../styles/pages/About.css'

const MENU = ['ABOUT US', 'SERVICE', 'CONTACT', 'Q&A']

const FAQS = [
  {
    q: 'VibeVita hoạt động thế nào?',
    a: 'Bạn tìm PT theo vị trí/chuyên môn → xem hồ sơ & đánh giá → chọn gói → thanh toán → đặt lịch & nhận nhắc lịch.'
  },
  {
    q: 'Có PT online không?',
    a: 'Có. Bạn có thể đặt buổi tập online qua video call và nhận giáo án, theo dõi tiến trình ngay trên hệ thống.'
  },
  {
    q: 'Hủy/đổi lịch thế nào?',
    a: 'Bạn có thể hủy/đổi trước giờ tập tối thiểu 2 giờ. Hệ thống sẽ tự động thông báo cho PT.'
  },
  {
    q: 'Có gói doanh nghiệp không?',
    a: 'Chúng tôi hỗ trợ gói team/company. Liên hệ để nhận ưu đãi & bảng giá riêng.'
  },
  {
    q: 'Thanh toán an toàn chứ?',
    a: 'Thanh toán qua đối tác cổng thanh toán. Thông tin được mã hóa và tuân thủ tiêu chuẩn an toàn.'
  }
]

export default function About() {
  // Mặc định hiển thị ABOUT US
  const [activeItem, setActiveItem] = useState('ABOUT US')
  const [open, setOpen] = useState(null)

  const onSubmitContact = (e) => {
    e.preventDefault()
    alert('✅ Cảm ơn bạn đã gửi yêu cầu')
  }

  return (
    <div className="ab-page">
      <div className="ab-topbar" />

      <div className="ab-wrap">
        {/* Sidebar */}
        <aside className="ab-sidebar">
          <nav className="ab-nav">
            {MENU.map((m) => (
              <button
                key={m}
                className={`ab-nav-item ${activeItem === m ? 'active' : ''}`}
                onClick={() => setActiveItem(m)}
              >
                <span>{m}</span>
                <TriangleIcon />
              </button>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="ab-main">
          {/* ABOUT US */}
          {activeItem === 'ABOUT US' && (
            <section className="ab-card ab-content">
              <h1 className="ab-h1">
                VibeVita — Thuê Huấn Luyện Viên Cá Nhân dễ dàng
              </h1>
              <p className="ab-lead">
                Nền tảng kết nối bạn với PT uy tín, theo dõi tiến trình tập
                luyện, dinh dưỡng và đặt lịch/ thanh toán chỉ trong vài bước.
              </p>

              <div className="ab-grid">
                <Feature
                  icon={<SearchIcon />}
                  title="Tìm PT gần bạn"
                  desc="Lọc theo vị trí, chuyên môn (Gym, Yoga, Weight-loss...), mức giá & đánh giá."
                />
                <Feature
                  icon={<CalendarIcon />}
                  title="Đặt lịch & nhắc lịch"
                  desc="Đồng bộ lịch tập, nhận thông báo tự động trước giờ tập."
                />
                <Feature
                  icon={<SparkIcon />}
                  title="Theo dõi tiến trình"
                  desc="Cập nhật số đo, chỉ số BMI, mục tiêu – nhìn thấy sự thay đổi mỗi tuần."
                />
                <Feature
                  icon={<CreditCardIcon />}
                  title="Gói linh hoạt"
                  desc="Buổi lẻ / 7 ngày / tháng; thanh toán nhanh qua cổng an toàn."
                />
                <Feature
                  icon={<ShieldIcon />}
                  title="Đánh giá & bảo chứng"
                  desc="Xem review thực tế của học viên, báo cáo phiên tập minh bạch."
                />
                <Feature
                  icon={<MapIcon />}
                  title="Online & Offline"
                  desc="Chọn PT online hoặc tại phòng tập đối tác gần bạn."
                />
              </div>

              <h2 className="ab-h2">Bắt đầu trong 4 bước</h2>
              <ol className="ab-steps">
                <li>
                  <span>1</span> Tìm & lọc PT theo nhu cầu
                </li>
                <li>
                  <span>2</span> Xem hồ sơ, kinh nghiệm & review
                </li>
                <li>
                  <span>3</span> Chọn gói phù hợp và thanh toán
                </li>
                <li>
                  <span>4</span> Đặt lịch – tập và theo dõi tiến trình
                </li>
              </ol>
            </section>
          )}

          {/* SERVICE */}
          {activeItem === 'SERVICE' && (
            <section className="ab-card ab-content">
              <h1 className="ab-h1">Dịch vụ của chúng tôi</h1>
              <div className="ab-service-grid">
                <ServiceCard
                  title="PT 1–1 tại phòng tập"
                  points={[
                    'Giáo án cá nhân hóa',
                    'Sửa form trực tiếp',
                    'Theo dõi tiến trình'
                  ]}
                />
                <ServiceCard
                  title="PT Online"
                  points={[
                    'Call trực tuyến',
                    'Video bài tập',
                    'Feedback sau mỗi buổi'
                  ]}
                />
                <ServiceCard
                  title="Dinh dưỡng & Meal plan"
                  points={[
                    'Thực đơn theo mục tiêu',
                    'Kiểm tra macro',
                    'Gợi ý thay thế món'
                  ]}
                />
                <ServiceCard
                  title="Combo Gym + PT"
                  points={[
                    'Đối tác phòng tập',
                    'Ưu đãi theo khu vực',
                    'Hỗ trợ đổi lịch linh hoạt'
                  ]}
                />
                <ServiceCard
                  title="Gói Doanh nghiệp"
                  points={[
                    'Workshop/Team building',
                    'Ưu đãi nhóm',
                    'Báo cáo sức khỏe tổng hợp'
                  ]}
                />
              </div>
            </section>
          )}

          {/* CONTACT */}
          {activeItem === 'CONTACT' && (
            <section className="ab-card ab-content">
              <h1 className="ab-h1">Contact us</h1>
              <div className="ab-contact">
                <div className="ab-contact-info">
                  <p>
                    <PhoneIcon /> 0123456789
                  </p>
                  <p>
                    <MailIcon /> vibevitaofficial@gmail.com
                  </p>
                  <p>
                    <MapIcon /> Đà Nẵng, Việt Nam
                  </p>
                </div>
                <form className="ab-contact-form" onSubmit={onSubmitContact}>
                  <input type="email" placeholder="Enter your email" required />
                  <button type="submit">SEND</button>
                </form>
              </div>
            </section>
          )}

          {/* Q&A */}
          {activeItem === 'Q&A' && (
            <section className="ab-card">
              {FAQS.map((item, idx) => {
                const isOpen = open === idx
                return (
                  <div key={idx} className={`ab-faq ${isOpen ? 'open' : ''}`}>
                    <button
                      className="ab-faq-head"
                      onClick={() => setOpen(isOpen ? null : idx)}
                    >
                      <span className="ab-faq-text">{item.q}</span>
                      <span className={`ab-faq-plus ${isOpen ? 'minus' : ''}`}>
                        <PlusIcon />
                      </span>
                    </button>
                    {isOpen && (
                      <div className="ab-faq-body">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

/* ========= Small presentational components ========= */
function Feature({ icon, title, desc }) {
  return (
    <div className="ab-feature">
      <div className="ab-feature-ico">{icon}</div>
      <div>
        <div className="ab-feature-title">{title}</div>
        <div className="ab-feature-desc">{desc}</div>
      </div>
    </div>
  )
}
function ServiceCard({ title, points = [] }) {
  return (
    <div className="ab-service-card">
      <div className="ab-service-title">{title}</div>
      <ul>
        {points.map((p, i) => (
          <li key={i}>
            <CheckIcon /> {p}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ==== Icons ==== */
function TriangleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24">
      <path d="M8 5l8 7-8 7V5z" fill="currentColor" />
    </svg>
  )
}
function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24">
      <path d="M11 5h2v6h6v2h-6v6h-2v-6H5v-2h6z" fill="currentColor" />
    </svg>
  )
}
function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        d="M15.5 14h-.79l-.28-.27A6.5 6.5 0 1 0 14 15.5l.27.28v.79L20 21.5 21.5 20 15.5 14Z"
        fill="currentColor"
      />
    </svg>
  )
}
function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        d="M7 2h2v2h6V2h2v2h3v18H4V4h3V2Zm12 6H5v12h14V8Z"
        fill="currentColor"
      />
    </svg>
  )
}
function SparkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path d="M12 2 9 9 2 12l7 3 3 7 3-7 7-3-7-3-3-7Z" fill="currentColor" />
    </svg>
  )
}
function CreditCardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        d="M3 5h18v14H3V5Zm2 6h14v6H5v-6Zm0-4v2h14V7H5Z"
        fill="currentColor"
      />
    </svg>
  )
}
function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        d="M12 2 4 6v6c0 5 8 10 8 10s8-5 8-10V6l-8-4Z"
        fill="currentColor"
      />
    </svg>
  )
}
function MapIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        d="m15 6 6-2v14l-6 2-6-2-6 2V6l6-2 6 2Zm0 12 4-1.3V5l-4 1.3V18ZM9 6.7 7 6v12l2 .7V6.7Z"
        fill="currentColor"
      />
    </svg>
  )
}
function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.36 2.2.56 3.4.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C11.3 21 3 12.7 3 2a1 1 0 0 1 1-1h3.4a1 1 0 0 1 1 1c0 1.2.2 2.3.56 3.4a1 1 0 0 1-.24 1L6.6 10.8Z"
        fill="currentColor"
      />
    </svg>
  )
}
function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path
        d="M20 4H4v16h16V4Zm-2 4-6 4-6-4V6l6 4 6-4v2Z"
        fill="currentColor"
      />
    </svg>
  )
}
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path
        d="M9 16.2 4.8 12 3.4 13.4 9 19 21 7l-1.4-1.4L9 16.2Z"
        fill="currentColor"
      />
    </svg>
  )
}

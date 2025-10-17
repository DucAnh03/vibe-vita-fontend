import React, { useEffect, useState } from 'react'
import { Table, Spinner, Alert, Card } from 'react-bootstrap'
import '../styles/pages/UserBooking.css'

export default function UserBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)

  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/booking/user', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await res.json()
        setBookings(Array.isArray(data) ? data : data.bookings || [])
      } catch (err) {
        console.error('❌ Lỗi khi lấy bookings:', err)
      } finally {
        setLoading(false)
      }
    }

    if (token) fetchBookings()
  }, [token])

  if (!token) {
    return (
      <Alert variant="warning" className="mt-4 text-center ub-alert">
        ⚠ Bạn cần đăng nhập để xem lịch đã đặt
      </Alert>
    )
  }

  if (loading) {
    return (
      <div className="text-center mt-5 ub-loading">
        <Spinner animation="border" />
        <p className="mt-3">⏳ Đang tải dữ liệu...</p>
      </div>
    )
  }

  return (
    <div className="ub-page container mt-5">
      <Card className="ub-card shadow-lg rounded-4">
        <Card.Body>
          <Card.Title className="ub-title text-center fw-bold fs-3 mb-4">
            📅 Lịch tập của tôi
          </Card.Title>

          {bookings.length === 0 ? (
            <Alert variant="info" className="text-center ub-alert">
              ❌ Bạn chưa đặt lịch nào.
            </Alert>
          ) : (
            <Table
              striped
              bordered
              hover
              responsive
              className="align-middle ub-table"
            >
              <thead className="table-dark text-center">
                <tr>
                  <th>Ngày</th>
                  <th>Giờ</th>
                  <th>Ghi chú</th>
                  <th>Huấn luyện viên</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b._id} className="text-center">
                    <td>{b.day}</td>
                    <td>{b.time}</td>
                    <td>{b.note}</td>
                    <td>
                      {b.trainerId?.name ||
                        b.trainerId?.username ||
                        b.trainerId?.email ||
                        'Chưa có tên'}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          b.status === 'confirmed'
                            ? 'bg-success'
                            : b.status === 'cancelled'
                            ? 'bg-danger'
                            : 'bg-warning'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  )
}

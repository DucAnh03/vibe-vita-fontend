import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // ✅ dùng để điều hướng
import "../styles/pages/__trainerprofile.css";

const TrainerProfile = () => {
  const [trainer, setTrainer] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const navigate = useNavigate(); // ✅ hook điều hướng

  const token = localStorage.getItem("token");

  // ✅ Lấy thông tin PT từ backend
  const fetchTrainer = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/trainers/profile/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTrainer(res.data);
      setFormData(res.data);
    } catch (error) {
      console.error("❌ Lỗi lấy thông tin PT:", error);
      setAlert({
        type: "danger",
        message: "Không thể tải thông tin huấn luyện viên.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainer();
  }, []);

  // ✅ Xử lý input text
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Xử lý giá buổi tập
  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      prices: { ...prev.prices, [name]: Number(value) },
    }));
  };

  // ✅ Cập nhật thông tin
  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setAlert({ type: "", message: "" });

    try {
      const res = await axios.put(
        "http://localhost:5000/api/trainers/profile/update",
        {
          gender: formData.gender,
          location: formData.location,
          specialty: formData.specialty,
          experience: formData.experience,
          description: formData.description,
          image: formData.image,
          prices: formData.prices,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAlert({
        type: "success",
        message: "✅ Cập nhật thông tin thành công!",
      });
      setTrainer(res.data.updated);
      setFormData(res.data.updated);
    } catch (error) {
      console.error("❌ Lỗi cập nhật:", error);
      setAlert({
        type: "danger",
        message: "Cập nhật thất bại. Vui lòng thử lại!",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" /> <p>Đang tải dữ liệu...</p>
      </div>
    );

  if (!formData)
    return (
      <p className="text-center mt-5 text-danger">
        Không tìm thấy thông tin huấn luyện viên.
      </p>
    );

  return (
    <Container className="trainer-profile py-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="trainer-card shadow-lg p-4 position-relative">
            {/* ✅ Nút quay lại */}
            <Button
              variant="outline-secondary"
              className="position-absolute top-0 start-0 m-3"
              onClick={() => navigate("/pt-home")}
            >
              ⬅️ Quay lại
            </Button>

            <div className="text-center mt-3">
              <img
                src={
                  formData.image ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt={formData.username}
                className="rounded-circle mb-3"
                width={120}
                height={120}
              />
              <h3>{formData.username}</h3>

              {/* ✅ Chỉ hiển thị email nếu khác test@example.com */}
              {formData.email && formData.email !== "test@example.com" && (
                <p className="text-muted">{formData.email}</p>
              )}
            </div>

            {alert.message && (
              <Alert variant={alert.type} className="text-center">
                {alert.message}
              </Alert>
            )}

            <Form onSubmit={handleUpdate}>
              <Form.Group className="mb-3">
                <Form.Label>Giới tính</Form.Label>
                <Form.Control
                  name="gender"
                  value={formData.gender || ""}
                  onChange={handleChange}
                  placeholder="male / female"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Địa chỉ</Form.Label>
                <Form.Control
                  name="location"
                  value={formData.location || ""}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ..."
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Chuyên môn</Form.Label>
                <Form.Control
                  name="specialty"
                  value={formData.specialty || ""}
                  onChange={handleChange}
                  placeholder="VD: Gym, Yoga, Dinh dưỡng..."
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Kinh nghiệm</Form.Label>
                <Form.Control
                  name="experience"
                  value={formData.experience || ""}
                  onChange={handleChange}
                  placeholder="VD: 5 năm kinh nghiệm"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mô tả bản thân</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  placeholder="Giới thiệu ngắn về bản thân và phong cách huấn luyện..."
                />
              </Form.Group>

              <hr />
              <h5 className="mt-3 mb-2 text-center">💰 Bảng giá huấn luyện</h5>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>1 buổi</Form.Label>
                    <Form.Control
                      type="number"
                      name="oneSession"
                      value={formData.prices?.oneSession || 0}
                      onChange={handlePriceChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>3 - 7 buổi</Form.Label>
                    <Form.Control
                      type="number"
                      name="threeToSeven"
                      value={formData.prices?.threeToSeven || 0}
                      onChange={handlePriceChange}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>1 tháng</Form.Label>
                    <Form.Control
                      type="number"
                      name="monthly"
                      value={formData.prices?.monthly || 0}
                      onChange={handlePriceChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="text-center mt-4">
                <Button variant="primary" type="submit" disabled={updating}>
                  {updating ? "Đang lưu..." : "💾 Cập nhật thông tin"}
                </Button>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TrainerProfile;

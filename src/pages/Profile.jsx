import React, { useState, useEffect, useMemo } from "react";
import { Form, Button, Card, Spinner, Alert } from "react-bootstrap";

const API_BASE = "http://localhost:5000"; // đổi nếu bạn deploy

export default function Profile() {
  const [user, setUser] = useState({ username: "", email: "", phone: "" });
  const [initialUser, setInitialUser] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false); // loading khi submit
  const [fetching, setFetching] = useState(true); // loading khi fetch me
  const [msg, setMsg] = useState({ type: "", text: "" }); // success | danger | ""
  const [touched, setTouched] = useState({
    username: false,
    email: false,
    phone: false,
  });

  // Validate cơ bản
  const emailValid = useMemo(
    () => /^\S+@\S+\.\S+$/.test(user.email || ""),
    [user.email]
  );
  const phoneValid = useMemo(
    () => /^([0-9]{10,11})$/.test(user.phone || ""),
    [user.phone]
  );

  const isChanged = useMemo(
    () =>
      user.username !== initialUser.username ||
      user.email !== initialUser.email ||
      user.phone !== initialUser.phone,
    [user, initialUser]
  );

  // Tải thông tin user hiện tại: GET /api/auth/me (trả { user: {...} })
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setFetching(true);
        setMsg({ type: "", text: "" });

        const res = await fetch(`${API_BASE}/api/auth/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();

        if (res.ok && data?.user) {
          const payload = {
            username: data.user.username || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
          };
          setUser(payload);
          setInitialUser(payload);
        } else {
          setMsg({
            type: "danger",
            text: data?.message || "Không thể tải thông tin người dùng.",
          });
        }
      } catch (err) {
        console.error("❌ /api/auth/me error:", err);
        setMsg({ type: "danger", text: "Không thể kết nối tới server." });
      } finally {
        setFetching(false);
      }
    };

    fetchUser();
  }, []);

  // Handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMsg({ type: "", text: "" });
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // Submit cập nhật: PUT /api/auth/profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    if (!user.username?.trim()) {
      return setMsg({
        type: "danger",
        text: "Tên người dùng không được để trống.",
      });
    }
    if (!emailValid) {
      return setMsg({ type: "danger", text: "Email không hợp lệ." });
    }
    if (user.phone && !phoneValid) {
      return setMsg({
        type: "danger",
        text: "Số điện thoại phải gồm 10–11 chữ số.",
      });
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          username: user.username.trim(),
          email: user.email.trim(),
          phone: user.phone.trim(),
          // nếu muốn gửi thêm dateOfBirth/gender/height/weight thì thêm vào đây
        }),
      });

      const data = await res.json();

      if (res.ok && data?.data?.user) {
        const updated = {
          username: data.data.user.username || "",
          email: data.data.user.email || "",
          phone: data.data.user.phone || "",
        };
        setUser(updated);
        setInitialUser(updated);
        setTouched({ username: false, email: false, phone: false });
        setMsg({
          type: "success",
          text: data.message || "Cập nhật thông tin thành công!",
        });
      } else {
        setMsg({
          type: "danger",
          text: data?.message || "Không thể cập nhật thông tin.",
        });
      }
    } catch (err) {
      console.error("❌ /api/auth/profile error:", err);
      setMsg({ type: "danger", text: "Không thể kết nối tới server." });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUser(initialUser);
    setMsg({ type: "", text: "" });
    setTouched({ username: false, email: false, phone: false });
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <Card
        style={{ width: "60rem", padding: "3rem" }}
        className="shadow-lg rounded-4"
      >
        <Card.Body>
          <Card.Title className="text-center mb-4 fw-bold fs-1">
            Cập nhật thông tin cá nhân
          </Card.Title>

          {msg.text ? (
            <Alert
              variant={msg.type === "success" ? "success" : "danger"}
              className="mb-4"
              dismissible
              onClose={() => setMsg({ type: "", text: "" })}
            >
              {msg.text}
            </Alert>
          ) : null}

          {fetching ? (
            <div className="text-center py-4">
              <Spinner animation="border" />
              <p className="mt-3 mb-0">Đang tải thông tin...</p>
            </div>
          ) : (
            <Form onSubmit={handleSubmit} noValidate>
              {/* Username */}
              <Form.Group className="mb-4" controlId="formUsername">
                <Form.Label className="fw-semibold fs-5">
                  Tên người dùng
                </Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="p-3 fs-5"
                  isInvalid={touched.username && !user.username?.trim()}
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập tên người dùng.
                </Form.Control.Feedback>
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-4" controlId="formEmail">
                <Form.Label className="fw-semibold fs-5">
                  Địa chỉ Email
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="p-3 fs-5"
                  isInvalid={touched.email && !!user.email && !emailValid}
                />
                <Form.Control.Feedback type="invalid">
                  Email không hợp lệ.
                </Form.Control.Feedback>
              </Form.Group>

              {/* Phone */}
              <Form.Group className="mb-4" controlId="formPhone">
                <Form.Label className="fw-semibold fs-5">
                  Số điện thoại
                </Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={user.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="p-3 fs-5"
                  isInvalid={touched.phone && !!user.phone && !phoneValid}
                />
                <Form.Control.Feedback type="invalid">
                  Số điện thoại phải gồm 10–11 chữ số.
                </Form.Control.Feedback>
                <Form.Text muted>Tùy chọn, có thể để trống.</Form.Text>
              </Form.Group>

              <div className="d-flex justify-content-center gap-3 mt-4">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading || !isChanged}
                  className="px-5 py-3 fs-5"
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" className="me-2" /> Đang lưu...
                    </>
                  ) : (
                    "Lưu thay đổi"
                  )}
                </Button>

                <Button
                  variant="outline-secondary"
                  type="button"
                  className="px-5 py-3 fs-5"
                  onClick={handleReset}
                  disabled={loading || !isChanged}
                >
                  Hoàn tác
                </Button>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

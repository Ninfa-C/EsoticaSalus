import { useState } from "react";
import { LoginAccount, SetToken } from "../api";
import { FloatingLabel, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  
const dispatch = useDispatch()
const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
      await LoginAccount(form);
      dispatch(SetToken());
        navigate("/")
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-75 mx-auto py-3">
        <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </FloatingLabel>

        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </FloatingLabel>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;

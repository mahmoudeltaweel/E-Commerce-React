import { useState } from "react";
import { baseURL, LOGIN } from "../../Api/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import google from "../../../src/images.jpg";
import Cookie from "cookie-universal";
import { Form } from "react-bootstrap";

export default function Login() {
  // states
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  //   loading
  const [loading, setLoading] = useState(false);
  // cookie
  const cookie = Cookie();
  // navigat
  const nav = useNavigate();
  // error
  const [err, setErr] = useState("");

  function handelchange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handelsubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${LOGIN}`, form);
      nav("/");
      setLoading(false);
      const token = res.data.token;
      cookie.set("e-commerce", token);
    } catch (err) {
      if (err.response.status === 401) {
        setErr("Email or password is wrong");
      } else {
        setErr("internal server Error");
      }

      setLoading(false);
    }
  }

  return (
    <>
      {loading && <Loading />}
      <div className="container">
        <div className="row" style={{height:"100vh"}}>
          <Form className="form" onSubmit={handelsubmit}>
            <div className="custom-form">
              <h1 className="mb-5">Login</h1>
              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" placeholder="Enter your Email.... "  name="email"
                  required value={form.email}
                  onChange={handelchange}  />
              </Form.Group>
              <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label>password:</Form.Label>
                <Form.Control type="password" placeholder="Enter your password.... " name="password"  minLength="6"
                  required  value={form.password}
                  onChange={handelchange}  />
              </Form.Group>

              <button className="btn btn-primary">Login</button>
              <div className="google-btn">
                <a href={`http://127.0.0.1:8000/login-google`}>
                  <div className="google-icon-wrapper">
                    <img
                      className="google-icon"
                      src={google}
                      alt="sign in with google"
                    />
                  </div>
                  <p className="btn-text">
                    <b>Sign in with google</b>
                  </p>
                </a>
              </div>
              {err !== "" && <span className="error">{err}</span>}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

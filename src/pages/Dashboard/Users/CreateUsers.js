    import { useState } from "react";
    import { useNavigate } from "react-router-dom";
    import { Form } from "react-bootstrap";
import { Axios } from "../../../Api/axios";
import { USER } from "../../../Api/Api";
import Loading from "../../../components/Loading/Loading";
    
    export default function CreateUsers() {
      // states
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [role, setRole] = useState("");
      const [password, setPassword] = useState("");
      const [loading, setLoading] = useState(false);
      //   navigat
      const nav = useNavigate();
      // error
      const [err, setErr] = useState("");
    
      async function handelsubmit(e) {
        setLoading(true);
        e.preventDefault();
        try {
          const res = await Axios.post(`/${USER}/add`, {
            name: name,
            email: email,
            role: role,
            password: password,
          })
          nav("/dashboard/users");
        } catch (err) {
          setLoading(false);
          setErr("emil has already been taken");
        }
      }
    
      return (
        <>
          {loading && <Loading />}
    
          <Form className="bg-white w-100 mx-2 p-3" onSubmit={handelsubmit}>
            <h1 className="mb-5">ِAdd User</h1>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                placeholder="enter your name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                required
                type="email"
                placeholder="enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                required
                type="password"
                placeholder="enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInputss">
              <Form.Label>Role</Form.Label>
              <Form.Select
              required
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
              
              <option disabled value="" >Select Role</option>
              <option value="1995">Admin</option>
              <option value="2001">user</option>
              <option value="1996">writer</option>
              <option value="1999">Product Manger</option>
              </Form.Select>
            </Form.Group>
            <button className="btn btn-primary" disabled={name.length > 1 && email.length > 1 && password.length >6 && role !=="" ? false : true } >
              Save
            </button>
            {err !== "" && <span className="error">{err}</span>}
          </Form>
        </>
      );
    }
    
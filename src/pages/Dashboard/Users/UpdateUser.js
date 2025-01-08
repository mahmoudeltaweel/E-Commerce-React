import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { USER } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import Loading from "../../../components/Loading/Loading";

export default function UpdateUser() {
  // states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [Disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  //   navigat
  const nav = useNavigate();
  // error
  const [err, setErr] = useState("");
  //   get id from url
  const { id } = useParams();

  //   usseeffect get user name and email

  useEffect(() => {
    setLoading(true);
    Axios.get(`/${USER}/${id}`)
    .then((data) => {
      setName(data.data.name);
      setEmail(data.data.email);
      setRole(data.data.role);
      setLoading(false);
      })
      .then(() => setDisable(false))
      .catch(()=>nav("/dashboard/users/page/404" , {replace:true}))
  }, []);

  async function handelsubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`/${USER}/edit/${id}`, {
        name: name,
        email: email,
        role: role,
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
        <h1 className="mb-5">Update User</h1>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            required
            value={name}
            placeholder="name@example.com"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            required
            type="email"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInputss">
          <Form.Label>Role</Form.Label>
          <Form.Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
          
          <option disabled value="" >Select Role</option>
          <option value="1995">Admin</option>
          <option value="2001">user</option>
          <option value="2005">writer</option>
          </Form.Select>
        </Form.Group>
        <button className="btn btn-primary" disabled={Disable}>
          Save
        </button>
        {err !== "" && <span className="error">{err}</span>}
      </Form>
    </>
  );
}

import { useEffect, useState } from "react";
import { baseURL, USER } from "../../Api/Api";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Cookie from "cookie-universal";
import { Form } from "react-bootstrap";
import Loading from "../../components/Loading/Loading";

export default function UpdateUser() {
  // states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  // cookie
  const cookie = Cookie();
  const token = cookie.get("e-commerce");
  //   navigat
  const nav = useNavigate();
  // error
  const [err, setErr] = useState("");
//   get id from url 
const  {id}  = useParams();

//   usseeffect get user name and email

useEffect(()=>{
    axios.get(`${baseURL}/${USER}/${id}` , {
        headers:{
            Authorization:"Bearer " + token
        }
    }).then((data)=>{
        setName(data.data.name)
        setEmail(data.data.email)
        
    }).then(()=>setDisable(false))
},[])
 
  async function handelsubmit(e) {
      setLoading(true);
    e.preventDefault();
    try {
      const res = await axios.post(`${baseURL}/${USER}/edit/${id}`, {
        name:name,
        email:email
      } , {
        headers:{
            Authorization:"Bearer " + token
        }
      })
      nav("/dashboard/users")
    } catch (err) {
      setLoading(false);
    }
  }

  return (
<>
{loading && <Loading /> }

      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handelsubmit}>
        <h1 className="mb-5">Update User</h1>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            required
            value= {name}
            placeholder="name@example.com"
            onChange={(e)=>setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value= {email}
            required
            type="email"
            placeholder="name@example.com"
            onChange={(e)=>setEmail(e.target.value)}
          />
        </Form.Group>
        <button className="btn btn-primary" disabled={Disable}>Save</button>
        {err !== "" && <span className="error">{err}</span>}
      </Form>
      </>
 
  );
}

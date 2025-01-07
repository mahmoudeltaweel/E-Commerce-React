import { useState } from "react"
import { Form } from "react-bootstrap"

export default function TestRef(){

    const[form , setForm]=useState({
        name:"",
        email:"",
        password:""
    })
    function handelchange(e){
        setForm({...form , [e.target.name]:e.target.value})
    }

    return(
        <div className="container">
<div className="row">
    <Form >
        <div>
            <h1 className="mb-5">Register</h1>
            <Form.Group
                className="form-custom"
                controlId="exampleForm.ControlInput3"
              >
                <Form.Label>Email:</Form.Label>
                <Form.Control type="text" placeholder="Enter your Name.... "  name="name"
                  required value={form.name}
                  onChange={handelchange}  />
              </Form.Group>
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

              <button className="btn btn-primary">Register</button>
        </div>
    </Form>
</div>
        </div>
    )
}
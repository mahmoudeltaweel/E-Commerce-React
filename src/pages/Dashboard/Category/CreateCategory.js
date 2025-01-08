import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { CATEGORY } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import Loading from "../../../components/Loading/Loading";

export default function CreateCategory(){
  // states
  const[title, setTitle]=useState("");
  const[image, setImage]=useState("");
  const [loading, setLoading] = useState(false);
  //   navigat
  const nav = useNavigate();

  async function handelsubmit(e) {
    setLoading(true);
    e.preventDefault();
    const form = new FormData();
    form.append("title",title);
    form.append("image",image);
    try {
      const res = await Axios.post(`/${CATEGORY}/add`, form)
      nav("/dashboard/categories");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  return (
    <>
      {loading && <Loading />}

      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handelsubmit}>
        <h1 className="mb-5">Create Category</h1>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            required
            value={title}
            placeholder="Enter Category title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImage(e.target.files.item(0))}
          />
        </Form.Group>
        <button className="btn btn-primary" disabled={title.length > 1 ? false : true } >
          Save
        </button>
      </Form>
    </>
  );
}

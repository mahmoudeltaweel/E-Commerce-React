import { useEffect, useState } from "react"
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { CATEGORY } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import Loading from "../../../components/Loading/Loading";

export default function UpdateCategory(){
    const [title , setTitle]=useState("");
    const [image , setImage]=useState("");
    const [loading, setLoading] = useState(false);
    const [disabled , setDisable]= useState(true);
    const {id} = useParams();
    const nav = useNavigate();

    useEffect(() => {
        setLoading(true);
        Axios.get(`/${CATEGORY}/${id}`)
        .then((data) => {
            setTitle(data.data.title);
          setLoading(false);
          })
          .then(() => setDisable(false))
          .catch(()=>nav("/dashboard/users/page/404" , {replace:true}))
      }, []);

    async function handelsubmit(e) {
        setLoading(true);
        e.preventDefault();
        const form = new FormData();
        form.append("title",title);
        form.append("image",image);
        try {
          const res = await Axios.post(`/${CATEGORY}/edit/${id}`, form)
          nav("/dashboard/categories");
        } catch (err) {
          setLoading(false);
          console.log(err);
        }
      }
    return(
 <>
      {loading && <Loading />}

      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handelsubmit}>
        <h1 className="mb-5">Update User</h1>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            required
            value={title}
            placeholder="enter product title "
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
    )
}
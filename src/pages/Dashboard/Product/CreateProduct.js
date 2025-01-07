import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CATEGORIES, PRODUCT } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import Loading from "../../../components/Loading/Loading";

export default function CreateProduct() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [categories, setCategories] = useState([]);
  const [id, setID] = useState("");
  const progress = useRef([]);
  const [form, setForm] = useState({
    category: "Select category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });
  const dummyform = {
    category: null,
    title: "dummy",
    description: "dummy",
    price: 222,
    discount: 0,
    About: "About",
  };

  const [images, setImage] = useState([]);
  const ids=useRef([])
  console.log(ids);
  

  const nav = useNavigate();

  const openImage = useRef(null);

  useEffect(() => {
    Axios.get(`/${CATEGORIES}`)
      .then((data) => setCategories(data.data))
      .catch((err) => console.log(err));
  }, []);

  function handelOpenImage() {
    openImage.current.click();
  }

  async function handelEdite(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await Axios.post(`/${PRODUCT}/edit/${id}`, form);
      setLoading(false);
      nav("/dashboard/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  

  function handelchange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSent(true);
    if (sent !== true) {
      HandelSubmitForm();
    }
  }
  // hadel submit form
  async function HandelSubmitForm() {
    try {
      const res = await Axios.post(`${PRODUCT}/add`, dummyform);
      setID(res.data.id);
      console.log(res);
    } catch (err) {
      console.log("err", err);
    }
  }
  const j = useRef(-1);
  // Handel Image Change
  async function HandelImageChange(e) {
    setImage((prev) => [...prev, ...e.target.files]);
    
    const imageAsfile = e.target.files;
    const data = new FormData();
    for (let index = 0; index < imageAsfile.length; index++) {
      j.current++;
      data.append("image", imageAsfile[index]);
      data.append("product_id", id);
      try {
        const res = await Axios.post("/product-img/add", data, {
          onUploadProgress: (ProgressEvent) => {
            const { loaded, total } = ProgressEvent;
            const percent = Math.floor((loaded * 100) / total);
            if(percent % 10 === 0){
              progress.current[j.current].style.width=`${percent}%`;
              progress.current[j.current].setAttribute("prcent" ,`${percent}`);
            }
          },
        });
        ids.current[j.current]=res.data.id;
      } catch (err) {
        console.log(err);
      }
    }
  }
  // delete product image /product-img/{id}
 async function handelDeleteImage(id,img){
  const idimage=ids.current[id];
  try{
      const res = await Axios.delete(`/product-img/${idimage}`)
      setImage(prev => prev.filter((image)=>image !==img ))
      ids.current=ids.current.filter((i)=> i !== idimage);
      --j.current;
  }catch(err){
      console.log(err);
  }
  }
  // mapping

  const imageshow = images.map((imge, key) => (
    <div key={key} className="border p-2 w-100">
      <div className="d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center justify-content-start gap-2 ">
        <img src={URL.createObjectURL(imge)} alt="imagepre" width="80px" />
        <div>
          <p className="mb-1">{imge.name}</p>
          <p>
            {imge.size / 1024 < 900
              ? (imge.size / 1024).toFixed(2) + "KB"
              : (imge.size / (1024 * 1024)).toFixed(2) + "MB"}
          </p>
        </div>
      </div>
        <Button variant="danger" onClick={(e)=>handelDeleteImage(key,imge)}>Delete</Button>
      </div>
      <div className="custom-progress mt-3">
        <span
        ref={(e)=>(progress.current[key] = e)}
          className="inner-progress"
        ></span>
      </div>
    </div>
  ));

  return (
    <>
      {loading && <Loading />}

      <Form className="bg-white w-100 mx-2 p-3" onSubmit={handelEdite}>
        <h1 className="mb-5">Create product</h1>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>select category</Form.Label>
          <Form.Select
            required
            defaultValue="option1"
            name="category"
            value={form.category}
            onChange={(e) => handelchange(e)}
          >
            <option disabled>Select category</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="Title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            required
            value={form.title}
            placeholder="enter product title "
            onChange={(e) => handelchange(e)}
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            required
            name="description"
            value={form.description}
            placeholder="enter product title "
            onChange={(e) => handelchange(e)}
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>price</Form.Label>
          <Form.Control
            type="text"
            required
            name="price"
            value={form.price}
            placeholder="enter price title "
            onChange={(e) => handelchange(e)}
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="Discount">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            type="text"
            required
            name="discount"
            value={form.discount}
            placeholder="enter product title "
            onChange={(e) => handelchange(e)}
            disabled={!sent}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="About">
          <Form.Label>About</Form.Label>
          <Form.Control
            type="text"
            required
            name="About"
            value={form.About}
            placeholder="enter product title "
            onChange={(e) => handelchange(e)}
            disabled={!sent}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Images">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            hidden
            ref={openImage}
            onChange={HandelImageChange}
            multiple
            disabled={!sent}
          />
        </Form.Group>
        <div
          onClick={handelOpenImage}
          className="d-flex justify-content-center align-items-center gap-2 py-3 rounded mb-2 w-100 flex-column"
          style={{
            border: !sent ? "2px dashed gray" : "2px dashed #0086fe",
            cursor: sent && "pointer",
          }}
        >
          <img
            src={require("../../../Assets/upload.webp")}
            alt="upload Here"
            style={{ filter: !sent && "grayscale(1)" }}
            width="100px"
          />
          <p
            className="fw-bold mb-0"
            style={{ color: !sent ? "gray" : "#0086fe" }}
          >
            Upload Images
          </p>
        </div>
        <div className="d-flex align-items-start flex-column gap-2">
          {imageshow}
        </div>
        <button
          className="btn btn-primary"
          disabled={form.title.length > 1 ? false : true}
        >
          Save
        </button>
      </Form>
    </>
  );
}

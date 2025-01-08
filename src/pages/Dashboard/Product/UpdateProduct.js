import { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { CATEGORIES, PRODUCT } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import Loading from "../../../components/Loading/Loading";

export default function UpdateProduct() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [imageFromServer,setImageFromServer]=useState([]);
  const [idsFromServer , setIdsFromServer]=useState([]);
 const {id}=useParams();
  const progress = useRef([]);
  const [form, setForm] = useState({
    category: "Select category",
    title: "",
    description: "",
    price: "",
    discount: "",
    About: "",
  });
  console.log(form);
  
  useEffect(()=>{
    Axios.get(`/${PRODUCT}/${id}`)
    .then((data)=>{
        setForm(data.data[0]);
        setImageFromServer(data.data[0].images)
    })
  },[])

  const [images, setImage] = useState([]);
  const ids=useRef([])

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
        for (let i = 0; i < idsFromServer.length; i++) {
            await Axios.delete(`/product-img/${idsFromServer[i]}`)
            .then((data)=>console.log(data))
        }
       await Axios.post(`/${PRODUCT}/edit/${id}`, form);
      setLoading(false);
      nav("/dashboard/products");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }

  

  function handelchange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
}
// setID(res.data.id);

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
        await Axios.delete(`/product-img/${idimage}`)
      setImage(prev => prev.filter((image)=>image !==img ))
      ids.current=ids.current.filter((i)=> i !== idimage);
      --j.current;
  }catch(err){
      console.log(err);
  }
  }

//   handel delte from server 
  function handelDeleteImagefromserver(id){
    setImageFromServer((prev) => prev.filter((img)=> img.id !== id));
    setIdsFromServer(prev => {
        return [...prev , id]
    })
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
//   handel image from server 

  const imageFromServershow = imageFromServer.map((imge, key) => (
    <div key={key} className="border p-2 col-2 position-relative">
      <div className="d-flex align-items-center justify-content-start gap-2 ">
        <img src={imge.image} alt="imagepre" className="w-100" />
      </div>
      <div style={{cursor:"pointer"}} className="position-absolute top-0 end-0 bg-danger rounded text-white">
    <p className="py-1 px-2 m-0"  onClick={()=>handelDeleteImagefromserver(imge.id)} >
        x
    </p>
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
          />
        </Form.Group>
        <div
          onClick={handelOpenImage}
          className="d-flex justify-content-center align-items-center gap-2 py-3 rounded mb-2 w-100 flex-column"
          style={{
            border: "2px dashed #0086fe",
            cursor:"pointer",
          }}
        >
          <img
            src={require("../../../Assets/upload.webp")}
            alt="upload Here"
            // style={{ filter: !sent && "grayscale(1)" }}
            width="100px"
          />
          <p
            className="fw-bold mb-0"
            style={{ color: "#0086fe" }}
          >
            Upload Images
          </p>
        </div>
        <div className="d-flex align-items-start flex-wrap gap-2">
          {imageFromServershow}
        </div>
        <div className="d-flex align-items-start flex-column gap-2">
          {imageshow}
        </div>
        <button
          className="btn btn-primary m-2 text-center"
          disabled={form.title.length > 1 ? false : true}
        >
          Update
        </button>
      </Form>
    </>
  );
}

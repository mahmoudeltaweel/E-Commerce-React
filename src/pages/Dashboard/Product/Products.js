import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Tableshow from "../Table";
import { PRODUCT, PRODUCTS } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";


export default function Products() {
  const [products, setProducts] = useState([]);
  const [delteProduct, setDelteProduct] = useState(true);

  const header=[
    {
      key:"category",
      name:"category"
    },
    {
      key:"title",
      name:"title"
    },
    {
      key:"description",
      name:"Description"
    },
    {
      key:"price",
      name:"price"
    },
    {
      key:"rating",
      name:"Rating"
    }
  ]
 

  useEffect(() => {
    Axios.get(`/${PRODUCTS}`)
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err));
  }, [delteProduct]);

  async function handeldelte(id) {
    try {
       const res = await Axios.delete(`/${PRODUCT}/${id}`);
       setDelteProduct(prev=> !prev)
      } catch (err) {
        console.log(err);
      }
}
  

  return (
    <div className="w-100 p-2 bg-white">
      <div className="d-flex align-items-center justify-content-between">
        <h1>products Page</h1>
        <Link to="/dashboard/product/add" className="btn btn-primary">
          Add product
        </Link>
      </div>
      <Tableshow header= {header} handeldelte={handeldelte} data={products}  />
    </div>
  );
}

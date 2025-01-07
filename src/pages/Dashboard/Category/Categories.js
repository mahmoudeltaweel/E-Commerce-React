
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, CATEGORY } from "../../../Api/Api";
import { Axios } from "../../../Api/axios";
import Tableshow from "../Table";


export default function Categories() {
  const [category, setCategory] = useState([]);
  const [delteCategory, setDelteCategory] = useState(true);

  const header=[
    {
      key:"title",
      name:"title"
    },
    {
      key:"image",
      name:"image"
    }
  ]
 

  useEffect(() => {
    Axios.get(`/${CATEGORIES}`)
      .then((data) => setCategory(data.data))
      .catch((err) => console.log(err));
  }, [delteCategory]);

  async function handeldelte(id) {
    try {
       const res = await Axios.delete(`/${CATEGORY}/${id}`);
       setDelteCategory(prev=> !prev)
      } catch (err) {
        console.log(err);
      }
}
  

  return (
    <div className="w-100 p-2 bg-white">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Categories Page</h1>
        <Link to="/dashboard/category/add" className="btn btn-primary">
          Add CAT
        </Link>
      </div>
      <Tableshow header= {header} handeldelte={handeldelte} data={category}  />
    </div>
  );
}

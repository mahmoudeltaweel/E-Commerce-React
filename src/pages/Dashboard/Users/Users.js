import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Tableshow from "../../../components/Dashboard/Table";
import { Axios } from "../../../Api/axios";
import { USER, USERS } from "../../../Api/Api";
export default function Users() {
  const [users, setUsers] = useState([]);
  const [delteuser, setDelteUser] = useState(true);
  const [currentUser, setCurrentUser] = useState("");
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setCurrentUser(data.data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    Axios.get(`/${USERS}`)
      .then((data) => setUsers(data.data))
      .catch((err) => console.log(err));
  }, [delteuser]);

  const header = [
    {
      key:"name",
      name:"name"
    },
    {
      key:"email",
      name:"email"
    },
    {
      key:"role",
      name:"role"
    }
  ]
  
  async function handeldelte(id) {
    try {
       const res = await Axios.delete(`/${USER}/${id}`);
       setDelteUser(prev=> !prev)
      } catch (err) {
        console.log(err);
      }
}

  return (
    <div className="w-100 p-2 bg-white">
      <div className="d-flex align-items-center justify-content-between">
        <h1>Users Page</h1>
        <Link to="/dashboard/user/add" className="btn btn-primary">
          Add Users
        </Link>
      </div>
      <Tableshow header={header} data={users} handeldelte={handeldelte} currentUser={currentUser} />
    </div>
  );
}

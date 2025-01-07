import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./bars.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { Axios } from "../../Api/axios";
import { LOGOUT, USER } from "../../Api/Api";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cookie from "cookie-universal";
export default function TopBar() {
    const navigat = useNavigate();
  const [name, setName] = useState("");
  const menu = useContext(Menu);
const cookie = Cookie();
  const setIsOpen = menu.setIsOpen;
  useEffect(()=>{
    Axios.get(`/${USER}`).then((data)=>setName(data.data.name))
    .catch(()=>navigat("/login" , {replace:true}))
},[])

  async function handelLogout() {
    try{
       const res = await Axios.get(`/${LOGOUT}`);
       cookie.remove("e-commerce")
       window.location.pathname="/login"
    }catch(err){
        console.log("err",err);
    }
}

  return (
    <div className="top-bar">
      <div className="d-flex justify-content-between align-items-center h-100 ">
        <div className="d-flex align-items-center gap-5">
          <h3>E-commerce</h3>
          <FontAwesomeIcon
            cursor={"pointer"}
            onClick={() => setIsOpen((prev) => !prev)}
            icon={faBars}
          />
        </div>
        <DropdownButton id="dropdown-basic-button" title={name}>
          <Dropdown.Item onClick={handelLogout}>Logout</Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  );
}

import { faUsers } from "@fortawesome/free-solid-svg-icons";
import "./bars.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { Menu } from "../../Context/MenuContext";
import { WindowSize } from "../../Context/WindowContext";
export default function SideBar() {
  const menu = useContext(Menu);
  const isOpen = menu.isOpen;

  const windowContext=useContext(WindowSize);
  const sizewindow = windowContext.windowSize;
  return (
    <>
    <div style={{
      position:"fixed",
      top:"70px",
      left:"0",
      width:"100%",
      height:"100vh",
      backgroundColor:"rgba(0,0,0,0.2)",
      display:sizewindow < '768' && isOpen ? "block" : "none" ,
    }}>

    </div>
    <div className="side-bar pt-3" 
     style={{
        left : sizewindow < "768" ? ( isOpen ? 0 : "-100%" ) :0  ,
        width:isOpen ? "220px" : "fit-content",
        position:sizewindow < "768" ?"fixed":"sticky"
    }}>
      <NavLink
        to={"users"}
        className="d-flex align-items-center gap-2 side-bar-link"
      >
        <FontAwesomeIcon icon={faUsers} style={{padding:isOpen ? "10px 8px 10px 15px" : " 10px 8px"}} />
        <p className="m-0" style={{
            display: isOpen ? "block" : "none" , 
        }}> Users</p>
      </NavLink>
    </div>
    </>  );
}

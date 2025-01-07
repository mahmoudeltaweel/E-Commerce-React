import { faPlus, faUsers } from "@fortawesome/free-solid-svg-icons";
import "./bars.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../../Context/MenuContext";
import { WindowSize } from "../../Context/WindowContext";
import { USER } from "../../Api/Api";
import { Axios } from "../../Api/axios";
import { links } from "./NavLink";
export default function SideBar() {
  const [user, setUser] = useState("");
  const menu = useContext(Menu);
  const isOpen = menu.isOpen;
  const windowContext = useContext(WindowSize);
  const sizewindow = windowContext.windowSize;
  const navigat = useNavigate();

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => navigat("/login", { replace: true }));
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "70px",
          left: "0",
          width: "100%",
          height: "100vh",
          backgroundColor: "rgba(0,0,0,0.2)",
          display: sizewindow < "768" && isOpen ? "block" : "none",
        }}
      ></div>
      <div
        className="side-bar pt-3"
        style={{
          left: sizewindow < "768" ? (isOpen ? 0 : "-100%") : 0,
          width: isOpen ? "220px" : "fit-content",
          position: sizewindow < "768" ? "fixed" : "sticky",
        }}
      >
        {links.map(
          (link ,index ) =>
            link.role.includes(user.role) && (
              <NavLink
              key={index}
                to={link.path}
                className="d-flex align-items-center gap-2 side-bar-link"
              >
                <FontAwesomeIcon
                  icon={link.icon}
                  style={{
                    padding: isOpen ? "10px 8px 10px 15px" : " 10px 8px",
                    width:"30px"
                  }}
                />
                <p
                  className="m-0"
                  style={{
                    display: isOpen ? "block" : "none",
                  }}
                >
                  {link.name}
                </p>
              </NavLink>
            )
        )}
      </div>
    </>
  );
}

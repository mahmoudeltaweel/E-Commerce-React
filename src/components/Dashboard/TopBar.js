import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./bars.css"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { useContext } from "react"
import { Menu } from "../../Context/MenuContext"

export default function TopBar(){
    const menu = useContext(Menu);
    const setIsOpen = menu.setIsOpen;
    
    return(
        <div className="top-bar d-flex align-items-center justify-content-between ">
            <div className="d-flex justify-content-between align-items-center gap-4 ">
                <h3>E-commerce</h3>
                 <FontAwesomeIcon cursor={"pointer"} onClick={()=>setIsOpen(prev => !prev)} icon={faBars} />
            </div>
        </div>
    )
}
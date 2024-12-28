import { Outlet } from "react-router-dom";
import SideBar from "../../components/Dashboard/SideBar";
import TopBar from "../../components/Dashboard/TopBar";
import "./dashboard.css"

export default function Dashboard(){
    return(
        <div className="postion-relative dashboard ">
            <TopBar />
            <div className="d-flex  gap-1" style={{marginTop:"70px"}}>
            <SideBar />
            <Outlet />
            </div>
        </div>
    )
}
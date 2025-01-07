import { Link } from "react-router-dom"
import "./403.css"
export default function Err({role}){
    return(
        <div className="text-wrapper">
            <div className="title" data-content={404}>
                40. ACCESS DENIED
            </div>
            <div className="subtitle">
                oops, you don not have permission to access this page.
                
                <Link to ={role==="1996" ?"/dashboard/writer":"/" }  className="btn btn-primary d-block " >
                {role==="1996" ? "Go To writer Page" : "Go To Home Page" }
                
                </Link>
            </div>
        </div>
    )
}
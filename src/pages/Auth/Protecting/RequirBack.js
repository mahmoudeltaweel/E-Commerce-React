import Cookie from "cookie-universal"
import { Navigate, Outlet } from "react-router-dom";
export default function RequirBack(){
    const cookie = Cookie();
    const token = cookie.get("e-commerce");
    return token ? window.history.back() : <Outlet /> 
}
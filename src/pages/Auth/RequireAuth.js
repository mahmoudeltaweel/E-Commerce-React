import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Navigate, Outlet,useNavigate } from "react-router-dom";
import { USER } from "../../Api/Api";
import Loading from "../../components/Loading/Loading";
import { Axios } from "../../Api/axios";
export default function RequireAuth(){
    const navigat = useNavigate();
    const[user, setUser]=useState("");
    const cookie = Cookie();
    const token = cookie.get("e-commerce") ;
    useEffect(()=>{
        Axios.get(`/${USER}`).then((data)=>setUser(data.data))
        .catch(()=>navigat("/login" , {replace:true}))
    },[])
    
    return token ? user === " " ? <Loading /> : <Outlet /> : <Navigate to={"/login" } replace= {true} /> ;
}

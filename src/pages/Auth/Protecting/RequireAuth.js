import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { USER } from "../../../Api/Api";
import Loading from "../../../components/Loading/Loading";
import { Axios } from "../../../Api/axios";
import Err from "../Errors/403";
export default function RequireAuth({allowedRole}) {
  const navigat = useNavigate();
  const [user, setUser] = useState("");
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => navigat("/login", { replace: true }));
  }, []);
  const cookie = Cookie();
  const token = cookie.get("e-commerce");

  return token ? (
    user === "" ? (
      <Loading />
    ) : allowedRole.includes(user.role) ? (
      <Outlet /> 
    ):(
        <Err role={user.role} />
    )
  ) : (
    <Navigate to={"/login"} replace={true} />
  );
}

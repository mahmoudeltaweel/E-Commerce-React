import { baseURL, LOGOUT } from "../../Api/Api";
import axios from "axios";
import Cookie from "cookie-universal";

export default function Logout(){
    // cookie 
    const cookie = Cookie();
    // function handelLogout 
    async function handelLogout() {
        try{
           const res = await axios.get(`${baseURL}/${LOGOUT}`,{
            headers:{
                Authorization:"Bearer " + cookie.get("e-commerce")
            }
           })
        }catch(err){
            console.log("err",err);
        }
    }

    return(
        <button onClick={handelLogout} >Logout</button>
    )
}
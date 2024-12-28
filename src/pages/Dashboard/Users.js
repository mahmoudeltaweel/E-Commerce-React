import { useEffect, useState } from "react"
import { USER, USERS } from "../../Api/Api"
import { Table } from "react-bootstrap";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Axios } from "../../Api/axios";
export default function Users(){
    const[users , setUsers]=useState([]);
    const[delteuser ,setDelteUser]=useState(true);
    const[noUsers, setNoUsers]=useState(false);
    const[currentUser,setCurrentUser]=useState("");
    useEffect(()=>{
        Axios.get(`/${USER}`)
        .then((data)=>setCurrentUser(data.data))
        .catch((err)=>console.log(err))
    },[])    
    useEffect(()=>{
        Axios.get(`/${USERS}`)
        .then((data)=>setUsers(data.data))
        .then(()=>setNoUsers(true))
        .catch((err)=>console.log(err))
    },[delteuser])
    async function handeldelte(id) {
        try{
            await Axios.delete(`/${USER}/${id}`)
            setDelteUser(prev => !prev)
        }catch(err){
            console.log(err);
        }
        
    }
    
    const userfilter=users.filter((user)=> user.id !== currentUser.id)
    const usershow=userfilter.map((item , index )=>(
        <tr key={index}>
            <td>{index+1}</td>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>
                <div className="d-flex align-items-center gap-2">
                    <Link to={`${item.id}`} >
                     <FontAwesomeIcon fontSize={"19px"} icon={faPenToSquare} cursor={"pointer"} />
                    </Link>
                     
                     {currentUser!==item.id && <FontAwesomeIcon fontSize={"19px"} cursor={"pointer"} color="red" onClick={()=>handeldelte(item.id)} icon={faTrash} />}
                </div>
            </td>
        </tr>
    ))

    return( 
        <div className="w-100 p-2 bg-white">
            <h1>Users Page</h1>
    <Table striped bordered hover>
        <thead>
          <tr>
            <th>num</th>
            <th>Name</th>
            <th>Email</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
            {users.length===0 ?
            ( <tr>
                    <td colSpan={12} style={{textAlign:"center"}}>
                        Loading....
                    </td>  
             </tr>): users.length>1 && noUsers ?(usershow):( <tr>
                    <td colSpan={12} style={{textAlign:"center"}}>
                        No Users Found 
                    </td>  
             </tr>)}
        </tbody>
      </Table>
      </div>

    )
}


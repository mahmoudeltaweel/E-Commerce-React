import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Tableshow(props) {
  const currentUser = props.currentUser || false ;
  const headershow = props.header.map((item , key) => <th key={key}>{item.name}</th>);
  const datashow = props.data.map((items, key) => (
    <tr key={key}>
      <td>{key+1}</td>
      {props.header.map((item, key2) => (
        <td key={key2}>{
          item.key==="image" ? <img width="40px" src={items[item.key]} alt="catimage" />
            : items[item.key] === "1995"
            ? "Admin"
            : items[item.key] === "1996"
            ? "Writer"
            : items[item.key]=== "1999"
            ? "Product Manger"
            : items[item.key]==="2001"
            ?"Users" : items[item.key]
            }
            {currentUser&&items[item.key]===currentUser.name && "(You)"}

        </td>
      ))}
      <td>
      <div className="d-flex align-items-center gap-2">
          <Link to={`${items.id}`}>
            <FontAwesomeIcon
              fontSize={"19px"}
              icon={faPenToSquare}
              cursor={"pointer"}
            />
          </Link>
          {  currentUser.id !== items.id &&
            <FontAwesomeIcon
              fontSize={"19px"}
              cursor={"pointer"}
              color="red"
              onClick={() => props.handeldelte(items.id)}
              icon={faTrash}
            /> 
          }
        </div>
      </td>
    </tr>
  ));
 
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>id</th>
          {headershow}
          <th>action</th>
        </tr>
      </thead>
      <tbody>
        {props.data.length===0 && (
          <tr className="text-center">
            <td colSpan={12}>
              Loading....
            </td>
          </tr>
        )}
        {datashow}
      </tbody>
    </Table>
  );
}

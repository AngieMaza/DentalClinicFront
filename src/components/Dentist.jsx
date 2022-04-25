import "./Style.css"
import { Link } from "react-router-dom";
import { useEffect, useState, handleClick } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Dentist() {
    const [dentists, setDentists] = useState([]);
    const [history, updateHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/dentist/all")
            .then(res => {
                setDentists(res.data);
            })
            .catch(err => {
                console.log(err);
            })
            setLoading(false);

    }, [loading]);


    handleClick = (e) => {
       
        const id = e.currentTarget.id;
        if (history.indexOf(id) === -1) {
            updateHistory([...history, id]);
            e.currentTarget.classList.add("selected");
        } else {
            updateHistory(history.filter(item => item !== id));
            e.currentTarget.classList.remove("selected");  
        }
    }
    const updateDentist = (e) => {
        if (history.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You must select at least one dentist",
                showConfirmButton: false,
                timer: 1500,
            });
        } else if( history.length > 1){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You can only select one dentist",
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            navigate(`/update-dentist/${history[0]}`);
        }
    }

    const deleteDentist = (e) => {
        setLoading(true);
        console.log(loading);
        if (history.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You must select at least one dentist",
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            history.forEach(id => {
                console.log(id);
                axios.delete(`http://localhost:8080/dentist/${id}`)
                    .then(res => {
                        Swal.fire({
                            icon: "success",
                            title: "Deleted!",
                            text: "Dentist has been deleted",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                    )
            })
            
        }
    }



    return (
        <div>
            <NavBar />
            <h1 className="text-center">Dentists</h1>
            <table>
                <tbody>
                    <tr key="0">
                        <th className="dentistTable">Name</th>
                        <th className="dentistTable">Last Name</th>
                        <th className="dentistTable">Regsitration Number</th>
                    </tr>
                    {dentists.map((dentist) => (
                        <tr
                            key={dentist.id}
                            id={dentist.id}
                            onClick={handleClick}
                        >
                            <td className="dentistTable">{dentist.name}</td>
                            <td className="dentistTable">{dentist.lastName}</td>
                            <td className="dentistTable">{dentist.registration_number}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="box">
                <Link className="boton boton-one" to={"/add-dentist"}>
                    Add
                </Link>
                <button className="boton boton-one" onClick={updateDentist}>
                    Update
                </button>
                <button className="boton boton-one" onClick={deleteDentist}>
                    Delete
                </button>
            </div>
        </div>
    );
}
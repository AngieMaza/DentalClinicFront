import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Appointment() {
    const [turnos,setTurnos] = useState([]);
    const [loading,setLoading] = useState(false);
    const [history,updateHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/appointment/all")
            .then(res => {
                setTurnos(res.data);
            })
            .catch(err => {
                console.log(err);
            })
            setLoading(false);
    }, [loading]);

    const handleClick = (e) => {
        const id = e.currentTarget.id;
        if (history.indexOf(id) === -1) {
            updateHistory([...history, id]);
            e.currentTarget.classList.add("selected");
        } else {
            updateHistory(history.filter(item => item !== id));
            e.currentTarget.classList.remove("selected");
        }
    }
    const updateAppointment = (e) => {
        if (history.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You must select at least one appointment",
                showConfirmButton: false,
                timer: 1500,
            });
        } else if( history.length > 1){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You can only select one appointment",
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            navigate(`/update-appointment/${history[0]}`);
        }
    }
    const deleteAppointment = (e) => {
        setLoading(true);
        if (history.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You must select at least one appointment",
                showConfirmButton: false,
                timer: 1500,
            });
        }
        else {
            history.forEach(id => {
                axios.delete(`http://localhost:8080/appointment/${id}`)
                    .then(res => {
                    Swal.fire({
                        icon: "success",
                        title: "Deleted!",
                        text: "The appointment has been deleted",
                        showConfirmButton: false,
                        timer: 1500,
                    })
                    })
        })
        }
    }


        
    return (
        <div>
            <NavBar/>
            <h1 className="text-center">Appointments</h1>
            <table>
                <tbody>
                    <tr key="0">
                        <th className="dentistTable">Date</th>
                        <th className="dentistTable">Patient</th>
                        <th className="dentistTable">Dentist</th>
                    </tr>
                    {turnos.map((turno) => (
                        <tr
                            key={turno.id}
                            id={turno.id}
                            onClick={handleClick}
                        >
                            <td className="dentistTable">{turno.date}</td>
                            <td className="dentistTable">{turno.patient.name +" "+turno.patient.lastName}</td>
                            <td className="dentistTable">{turno.dentist.name +" "+turno.dentist.lastName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="box2">
                <Link className="boton boton-one" to={"/add-appointment"}>
                    Add
                </Link>
                <button className="boton boton-one" onClick={updateAppointment}>Update</button>
                <button className="boton boton-one" onClick={deleteAppointment}>
                    Delete
                </button>
            </div>
        </div>
    );
}
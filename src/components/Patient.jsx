import "./Style.css"
import { Link } from "react-router-dom";
import { useEffect, useState, handleClick } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Patient() {
    const [patients, setPatients] = useState([]);
    const [history, updateHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:8080/patient/all")
            .then(res => {
                setPatients(res.data);
            })
            .catch(err => {
                console.log(err);
            })
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
    const updatePatient = (e) => {
        if (history.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You must select at least one patient",
                showConfirmButton: false,
                timer: 1500,
            });
        } else if( history.length > 1){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You can only select one patient",
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            navigate(`/update-patient/${history[0]}`);
        }
    }
    const deletePatient = (e) => {
        setLoading(true);
        if (history.length === 0) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Debe seleccionar al menos un odontologo",
                showConfirmButton: false,
                timer: 1500,
            });
        } else {
            history.forEach(id => {
                console.log(id);
            axios.delete(`http://localhost:8080/patient/${id}`)
                .then(res => {
                    Swal.fire({
                        icon: "success",
                        title: "Eliminado",
                        text: "Se ha eliminado el paciente",
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
            <h1 className="text-center">Patients</h1>
            <table>
                <tbody>
                    <tr key="0">
                        <th className="patientTable">Name</th>
                        <th className="patientTable">Last Name</th>
                        <th className="patientTable">DNI</th>
                        <th className="patientTable">EntryDate</th>
                        <th className="patientTable">Direccion</th>
                    </tr>
                    {patients.map((patient) => (
                        <tr
                            key={patient.id}
                            id={patient.id}
                            onClick={handleClick}
                        >
                            <td className="patientTable">{patient.name}</td>
                            <td className="patientTable">{patient.lastName}</td>
                            <td className="patientTable">{patient.dni}</td>
                            <td className="patientTable">{patient.entryDate}</td>
                            <td className="patientTable">{patient.address.street + " " + patient.address.number}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="box">
                <Link className="boton boton-one" to={"/add-patient"}>
                    Add
                </Link>
                <button className="boton boton-one" onClick={updatePatient}>Update</button>
                <button className="boton boton-one" onClick={deletePatient}>
                    Delete
                </button>
            </div>
        </div>
    );
}
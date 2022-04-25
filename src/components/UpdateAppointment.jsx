import axios from "axios";
import { useEffect } from "react";
import NavBar from "./NavBar";
import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useParams } from "react-router";

export default function UpdateAppointment() {
    const { id } = useParams();
    console.log(id);
    const [form, setForm] = useState({});
    const navigate = useNavigate();
    const [dentists, setDentists] = useState([]);
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8080/appointment/${id}`).then((res) => {
            console.log(res);
            setForm(res.data);
        });
        axios.get("http://localhost:8080/dentist/all")
        .then(res => {
            setDentists(res.data);
        })
        axios.get("http://localhost:8080/patient/all")
        .then(res => {
            setPatients(res.data);
        })
        setLoading(false);
    }, [id, loading]);

    const handleChange = (e) => {
        e.preventDefault();
        setForm({
            ...form,
            [e.target.id]: e.target.value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        axios.put("http://localhost:8080/appointment/update", form).then((res) => {
            console.log(res);
            Swal.fire({
                icon: "success",
                title: "Updated",
                text: "The appointment has been updated",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate("/appointment");
        });
    }

    return (
        <div>
            <NavBar/>
            <h1 className="text-center">Update Appointment</h1>
            <div className="d-flex justify-content-center">
                <form className="w-50 " onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input type="date" className="form-control" id="date" onChange={handleChange} />
                    </div>
                    <div className="form-group">
                    <h6 className="m-2">Patient</h6>
                    <select className="form-select" aria-label="Default select example">
                    <option>Select a patient</option>
                    {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                    {patient.name +" "+patient.lastName}
                    </option>
                    ))}
                    </select>
                    </div>
                    <div className="form-group">
                    <h6 className="m-2">Dentist</h6>
                    <select className="form-select" aria-label="Default select example">
                    <option>Select a dentist</option>
                    {dentists.map((dentist) => (
                    <option key={dentist.id} value={dentist.id}>
                        {dentist.name +" "+dentist.lastName}
                    </option>
                    ))}
                    </select>
                </div>
                <div className="text-center">
                <button type="submit" className="boton boton-one">
                Add
                </button>
                </div>
                </form>
            </div>
        </div>
    );

    
}
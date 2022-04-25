import NavBar from "./NavBar";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddPatient() {
    const initialValues = {
        name: "",
        lastName: "",
        dni: "",
        entryDate: "",
        address: {
            street: "",
            number: 0,
            city: "",
            province: "",
        },
    };
    const [form, setForm] = useState(initialValues);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault(loading);
        if (e.target.id in form.address) {
            setForm({
              ...form,
              address:{
                ...form.address,
                [e.target.id]: e.target.value,
              }
            })
          }else{
            setForm({
              ...form,
              [e.target.id]: e.target.value,
            });
          }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        setLoading(true);
        axios.post("http://localhost:8080/patient/add", form).then((res) => {
            console.log(res);
            Swal.fire({
                icon: "success",
                title: "Agregado",
                text: "Se ha agregado el paciente",
                showConfirmButton: false,
                timer: 1500,
            });
            setLoading(false);
            navigate("/patient");
        });
    };

    return (
        <div>
            <NavBar />
            <h1 className="text-center">Agregar un nuevo Paciente</h1>
            <div className="d-flex justify-content-center">
                <form className="w-50" onSubmit={handleSubmit}>
                    <h4 className="mt-3">Datos Personales</h4>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Name" required onChange={handleChange}/>
                        <label htmlFor="lastname" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="lastName" placeholder="Last Name" required onChange={handleChange}/>
                        <label htmlFor="dni" className="form-label">DNI</label>
                        <input type="text" className="form-control" id="dni" placeholder="DNI" required onChange={handleChange}/>
                        <label htmlFor="entryDate" className="form-label">Entry Date</label>
                        <input type="date" className="form-control" id="entryDate" placeholder="Entry Date" required onChange={handleChange}/>
                    </div>
                    <h4 className="mt-3">Address</h4>
                    <div className="form-group">
                        <label htmlFor="street" className="form-label">Street</label>
                        <input type="text" className="form-control" id="street" placeholder="Direccion" required onChange={handleChange}/>
                        <label htmlFor="number" className="form-label">Number</label>
                        <input type="number" className="form-control" id="number" placeholder="Number" required onChange={handleChange}/>
                        <label htmlFor="city" className="form-label">City</label>
                        <input type="text" className="form-control" id="city" placeholder="Ciudad" required onChange={handleChange}/>
                        <label htmlFor="province" className="form-label">Province</label>
                        <input type="text" className="form-control" id="province" placeholder="Province" required onChange={handleChange}/>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="boton boton-one" >Agregar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

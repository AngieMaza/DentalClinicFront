import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import NavBar from "./NavBar";

export default function UpdatePatient() {
    const [form, setForm] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    console.log(id);

    useEffect(() => { 
        axios.get(`http://localhost:8080/patient/${id}`).then((res) => {
            console.log(res);
            setForm(res.data);
        });
    }, [id]);

    const handleChange = (e) => {
        e.preventDefault(loading);
        setForm({
            ...form,
            [e.target.id]: e.target.value,
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
        setLoading(true);
        axios.put("http://localhost:8080/patient/update", form).then((res) => {
            console.log(res);
            Swal.fire({
                icon: "success",
                title: "Updated",
                text: "The patient has been updated",
                showConfirmButton: false,
                timer: 1500,
            });
            setLoading(false);
            navigate("/patient");
        });
    }

    return (
        <div>
            <NavBar />
            <h1 className="text-center">Update Patient</h1>
            <div className="d-flex justify-content-center">
                <form className="w-50 " onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Name"
                            required
                            value={form.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName" className="form-label">
                            Last Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            placeholder="Last Name"
                            required
                            value={form.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                    <label htmlFor="dni" className="form-label">DNI</label>
                        <input type="text" className="form-control" id="dni" placeholder="DNI" required value={form.dni} onChange={handleChange}/>
                        <label htmlFor="entryDate" className="form-label">Entry Date</label>
                        <input type="date" className="form-control" id="entryDate" placeholder="Entry Date" required onChange={handleChange}/>
                    </div>
                    <h4 className="mt-3">Address</h4>
                    <div className="form-group">
                        <label htmlFor="street" className="form-label">Street</label>
                        <input type="text" className="form-control" id="street" placeholder="Direccion"  onChange={handleChange}/>
                        <label htmlFor="number" className="form-label">Number</label>
                        <input type="number" className="form-control" id="number" placeholder="Number"   onChange={handleChange}/>
                        <label htmlFor="city" className="form-label">City</label>
                        <input type="text" className="form-control" id="city" placeholder="Ciudad"   onChange={handleChange}/>
                        <label htmlFor="province" className="form-label">Province</label>
                        <input type="text" className="form-control" id="province" placeholder="Province" required  onChange={handleChange}/>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="boton boton-one" >Agregar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}




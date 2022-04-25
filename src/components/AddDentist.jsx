import NavBar from "./NavBar";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function AddDentist() {
  const initialValues = {
    name: "",
    lastName: "",
    registration_number: "",
  };
  const [form, setForm] = useState(initialValues);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) => {
    e.preventDefault(loading);
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.post("http://localhost:8080/dentist/add", form).then((res) => {
      console.log(res);
      Swal.fire({
        icon: "success",
        title: "Added",
        text: "Denstist has been added",
        showConfirmButton: false,
        timer: 1500,
    });
    setLoading(false);
    navigate("/dentist");
    });
  };

  return (
    <div>
      <NavBar />
      <h1 className="text-center">Add a new Dentist</h1>
      <div className="d-flex justify-content-center">
        <form className="w-50 mt-5" onSubmit={handleSubmit}> 
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" placeholder="Name" required onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="lastname" className="form-label">Last Name</label>
            <input
              type="text" className="form-control" id="lastName" placeholder="Last Name" required onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="registration" className="form-label">Registration Number</label>
            <input
              type="text" className="form-control" id="registration_number" placeholder="Registration Number" required onChange={handleChange}/>
          </div>
          <div className="text-center">
          <button type="submit" className="boton boton-one" >Agregar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
import NavBar from "./NavBar";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function UpdateDentist() {
  const { id } = useParams();
  console.log(id);
  
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8080/dentist/${id}`).then((res) => {
        const initialForm = {
            id: res.data.id,
            name: res.data.name,
            lastName: res.data.lastName,
            registration_number: res.data.registration_number
        }
        setForm(initialForm);
    });
    }, [id]);

  const handleChange = (e) => {
    e.preventDefault(loading);
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    setLoading(true);
    axios.put("http://localhost:8080/dentist/update", form).then((res) => {
      console.log(res);
      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "The dentist has been updated",
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
      <h1 className="text-center">Update Dentist</h1>
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
              onChange={handleChange}
              value={form.name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Last Name"
              required
              onChange={handleChange}
                value={form.lastName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="registration" className="form-label">
              Registration Number
            </label>
            <input
              type="text"
              className="form-control"
              id="registration_number"
              placeholder="Registration Number"
              required
              onChange={handleChange}
                value={form.registration_number}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="boton boton-one">
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

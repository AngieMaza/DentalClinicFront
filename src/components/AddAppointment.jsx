import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function AddAppointment() {
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [dentists, setDentists] = useState([]);
  const [patients, setPatients] = useState([]);



  useEffect(() => {
    axios.get("http://localhost:8080/dentist/all")
        .then(res => {
            setDentists(res.data);
        })
    axios.get("http://localhost:8080/patient/all")
        .then(res => {
            setPatients(res.data);
        })
        setLoading(false);
    }, [loading]);


    
  const handleSubmit = (e) => {
      console.log(e);
     e.preventDefault();  
      
    axios.post("http://localhost:8080/appointment/add", {
        date:e.target[0].value,
          patient: {
              id: e.target[1].value,
          },
          dentist: {
              id: e.target[2].value,
          }
    }).then((res) => {
      console.log(res);
      Swal.fire({
        icon: "success",
        title: "Added",
        text: "Appointment has been added",
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
      navigate("/appointment");
    });
  };

  return (
    <div>
      <NavBar />
      <h1 className="text-center">Add a new Appointment</h1>
      <div className="d-flex justify-content-center">
        <form className="w-50 mt-5" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="date" className="form-label">
              Date
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              placeholder="Date"
              required
              
            />
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

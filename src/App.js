import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Appointment from "./components/Appointment";
import Dentist from "./components/Dentist";
import Patient from "./components/Patient";
import AddDentist from "./components/AddDentist";
import AddPatient from "./components/Addpatient";
import UpdateDentist from "./components/UpdateDentist";
import UpdatePatient from "./components/UpdatePatient";
import AddAppointment from "./components/AddAppointment";
import UpdateAppointment from "./components/UpdateAppointment";

function App() {

  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/appointment" element={<Appointment/>} />
          <Route path="/dentist" element={<Dentist/>}/>
          <Route path="/patient" element={<Patient/>} />
          <Route path="/add-appointment" element={<AddAppointment/>} />
          <Route path="/add-dentist" element={<AddDentist/>} />
          <Route path="/add-patient" element={<AddPatient/>} />
          <Route path="/update-dentist/:id" element={<UpdateDentist/>} />
          <Route path="/update-patient/:id" element={<UpdatePatient/>} />
          <Route path="/update-appointment/:id" element={<UpdateAppointment/>} />
        </Routes>
      </BrowserRouter>
  
  );
}

export default App;

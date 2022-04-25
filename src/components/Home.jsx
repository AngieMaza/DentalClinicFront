import "./Style.css";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="NavMain">
            <nav className="box">
                <Link className="boton boton-one" to={"/appointment"}>Appointments</Link>
                <Link className="boton boton-one" to={"/dentist"}>Dentists</Link>
                <Link className="boton boton-one" to={"/patient"}>Patients</Link>
            </nav>
        </div>
    );
}
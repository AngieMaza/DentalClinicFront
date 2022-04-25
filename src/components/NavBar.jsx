import { Link } from "react-router-dom"
import"./Style.css"

export default function NavBar() {
    return (

        <nav>
            <div>
                <Link className="boton boton-one p-2 m-3" to={"/home"}>
                    Home
                </Link>
            </div>
        </nav>
    )
}
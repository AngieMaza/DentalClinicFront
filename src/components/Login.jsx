import { useNavigate } from "react-router";

export default function Login() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target[0].value, e.target[1].value);
        fetch('http://localhost:8080/register', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(e.target[0].value + ':' + e.target[1].value)
            },
        }).then(res => {
            if (res.ok) {
                console.log(res);
                navigate("/home")
            }

        }).catch(error => {
            console.log(error);
        })
    };
    return (
        <div className="d-flex justify-content-center" >
            <form className="bg-primary bg-opacity-10 w-50 mt-5" onSubmit={handleSubmit}>
                <div className="p-3">
                    <label htmlFor="userName" className="form-label">User Name</label>
                    <input type="text" className="form-control" id="userName" aria-describedby="emailHelp" required />
                </div>
                <div className="p-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" required />
                </div>
                <div className="d-flex justify-content-center" >
                    <button type="submit" className="btn btn-primary m-3">Submit</button>
                </div>
            </form>
        </div>
    );
}
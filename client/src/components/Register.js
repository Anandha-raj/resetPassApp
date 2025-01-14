import { useState } from "react";
import api from "../apicall/api";
import { useNavigate } from "react-router-dom";

function Register() {
    // create state variables which hold name, email and password
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const handleClickNavigation = (page) => {
        navigate(page);
    };

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/users/register", { name, email, password });
            console.log("user is registered", res.data);
            setMessage("registration is successfull");
            handleClickNavigation("/changePassword")
            // reset the form fields once we submit the form
            setName('');
            setEmail("");
            setPassword('')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header text-center bg-primary text-white">
                                <h4>User Registration</h4>
                            </div>
                            <div className="card-body">
                                {message && <p>{message}</p>}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label>Name:</label>
                                        <input className="form-control" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                                    </div>

                                    <div className="mb-3">
                                        <label>Email:</label>
                                        <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>


                                    <div className="mb-3">
                                        <label>Password:</label>
                                        <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    </div>
                                    <div className="d-grid mb-3">
                                        <button type="submit" className="btn btn-primary">Register</button>
                                    </div>
                                    <div className="d-grid">
                                        <button type="button" onClick={handleClickNavigation("/changePassword")} className="btn btn-success">Login</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Register


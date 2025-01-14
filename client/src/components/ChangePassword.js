import { useState } from "react";
import api from "../apicall/api";

function ChangePassword() {
  // create state variables which hold name, email and password
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [resetLink, setResetLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await api.patch("/users/changePassword", { email });
      if(res.status === 201){
        setMessage("Email verified Successfully.");
        setResetLink(`http://localhost:3000/resetPassword/${res.data.user.resetString}`);
      }else{
        setMessage(res.message);
      }
    }catch(error){
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
                <h4>Verify Email</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>

                  <div className="mb-3">
                    <label>Email:</label>
                    <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Submit</button>
                    {message && <p>{message}</p>}
                    {resetLink.length? <a href={resetLink}>Click this link to update password</a> : ""}
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

export default ChangePassword


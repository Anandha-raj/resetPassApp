import { useState } from "react";
import api from "../apicall/api";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConPassword, setShowConPassword] = useState(false);
  const [message, setMessage] = useState('');

  const {resetString} = useParams();

  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };
  const handleCheckboxChange1 = () => {
    setShowConPassword(!showConPassword);
  };

  const resetFields = () => {
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConPassword(false);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await api.patch("/users/resetPassword", { password, confirmPassword, resetString });
      if(res.status === 201){
        setMessage(res.data.message);
      }else{
        setMessage(res.data.message);
      }
      resetFields();
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
                <h4>Reset Password</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>

                  <div className="mb-3">
                    <label>Password:</label>
                    <input className="form-control" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <input type="checkbox" name="showPassword" id="showPassword" checked={showPassword} onChange={handleCheckboxChange}/>
                    <label htmlFor="showPassword">Show Password</label>
                  </div>
                  <div className="mb-3">
                    <label>Confirm Password:</label>
                    <input className="form-control" type={showConPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    <input type="checkbox" name="showConPassword" id="showConPassword" checked={showConPassword} onChange={handleCheckboxChange1}/>
                    <label htmlFor="showConPassword">Show Password</label>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Update</button>
                    {message && <p>{message}</p>}
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

export default ResetPassword


import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Register from "./components/Register";
import ChangePassword from "./components/ChangePassword";
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element = {<Register />} />
          <Route path="/changePassword" element = {<ChangePassword />} />
          <Route path="/resetPassword/:resetString" element = {<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

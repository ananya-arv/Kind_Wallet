import { useNavigate } from "react-router-dom";
import Login from "./userLogin";

const Register = () => {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    setTimeout(() => navigate("/login"), 0);
  };
 

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Start Earning Kind Coins!</h1>
          <span>Do you have an account?</span>
          <div className="login">
          <button onClick={handleLogin}>Login</button>
          </div>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={(e) => { e.preventDefault(); handleNavigation(); }}></form>
          <form>
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="text" placeholder="Name" />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

import { useState } from "react"
import "./register.scss"
import { Link } from "react-router-dom";
import axios from 'axios'


const Register = () => {
    const [inputs, setInput] = useState({
       username: "",
       email: "",
       password: "",
       name: "", 
    });

    const [err, setErr] = useState(null);

    const handleChange = (e) => {
        setInput((prev) => ({...prev, [e.target.name]: e.target.value}));
    };
    
    const handleClick = async e => {
        e.preventDefault()


        try {
            await axios.post('http://localhost:8800/api/auth/register', inputs)
        } catch (err) {
           setErr(err.response.data); 
        }
    };
    console.log(err);
    return (
        <div className="register">
            <div className="card">
                <div className="left">
                    <h1>AzareAgro's</h1>
                    <p>By addressing these warnings and updating your dependencies accordingly,
                        you can ensure that your project remains compatible with current best
                    </p>
                    <span>Do  you have an account?</span>
                    <Link to="/login">
                    <button>Login</button>
                    </Link>
                </div>
                <div className="right">
                   <h1>Register</h1>
                   <form>
                        <input type="text" placeholder="Username" name="username" onChange={handleChange}/>
                        <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
                        <input type="text" placeholder="Password" name="password" onChange={handleChange}/>
                        <input type="Name" placeholder="Name" name="name" onChange={handleChange}/>
                        {err && err}
                        <button onClick={handleClick}>Register</button>
                    </form> 
                </div>
            </div>
        </div>
    )
}

export default Register 
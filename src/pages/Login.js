import React,{useState} from 'react'
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "./Login.css";

const Login = () => {

    const [email,setEmail]=useState(" ");
    const [password,setPassword]=useState(" ");

    const navigate=useNavigate();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const userCredential = await signInWithEmailAndPassword(auth,email,password);
            console.log(userCredential);
            const user=userCredential.user;
            localStorage.setItem('token',user.accessToken);
            localStorage.setItem('user',JSON.stringify(user));
            navigate("/");
        }
        catch(error)
        {
            console.error(error);
        }     
    }
  return (
    <div>
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit} className='login-form'>
            <input 
            type="email"
            placeholder="Your Email"
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input 
            type="password"
            placeholder="Your Password"
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <button type="submit" className="login-button">Login</button>
        </form>
      <p>Need to SignUp? <Link to="/signUp">Sign Up</Link></p>
    </div>
  )
}

export default Login
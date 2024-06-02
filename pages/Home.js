import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';
import Task from '../Components/Task';

const Home = () => {

   const navigate=useNavigate();
    const handleLogout= async()=>{
        await signOut(auth);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate("/login");
    }
  return (
    <div>
        <h1>TASK MANAGER </h1>
        <Task/>
        <button onClick={handleLogout} type="submit" className="btn btn-primary mt-4">Logout</button>
    </div>
  )
}

export default Home
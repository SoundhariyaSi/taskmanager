import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, 
         createRoutesFromElements,
         RouterProvider,
         Route,
 } from 'react-router-dom';
 import Login from './pages/Login';
 import SignUp from './pages/SignUp';
 import Home from './pages/Home';
 import Protected from './Components/Protected';

 const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signUp" element={<SignUp/>}/>
      <Route path="/" element={<Protected/>}>
        <Route path="/" index element={<Home/>}/>
      </Route>
    </Route>
  )
 );
 const root=ReactDOM.createRoot(document.getElementById('root'));
 root.render(
  <RouterProvider router={router}/>
 );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

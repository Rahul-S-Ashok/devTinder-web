import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';


const Login = () => {

  const [emailId,setEmailId]= useState("sari@gmail.com");
  const [password, setPassword]=useState("Sari@1290");
  const dispatch= useDispatch();
  const navigate = useNavigate();

  const handleLogin= async()=>{
     
    try{
      const res= await axios.post(BASE_URL + "/login",{
      emailId,
      password,
     },
    {withCredentials:true}
    );
    dispatch(addUser(res.data));
    navigate("/");
    }
    catch(err){
      console.error(err);
    }
  }

  return (
    <div className='flex justify-center my-10'>
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">

          <h2 className="card-title justify-center text-lg font-semibold">
            Login
          </h2>

          <div>
             <label className="form-control w-full max-w-xs my-3">
              <div className="label mb-1">
                <span className="label-text font-medium ">Email ID</span>
                <br />
              </div>
              <br />
              <input 
                type="text" 
                value={emailId}
                className="input input-bordered w-full max-w-xs text-sm pl-3 "
                onChange={(e)=> setEmailId(e.target.value)} 
              />
            </label> <br />
         
            <br />
            <label className="form-control w-full max-w-xs my-3"> 
              <div className="label mb-1">
                <span className="label-text font-medium">Password</span>
              </div>
              <input 
                type="text" 
                value={password}
                className="input input-bordered w-full max-w-xs pl-3 " 
                onChange={(e)=> setPassword(e.target.value)} 
              />
            </label>
          </div>
          
          <div class="flex justify-center mt-4">
             <button 
              className=" bg-purple-600 text-white w-40 px-4 py-2 rounded-md 
                       text-sm font-medium
                       hover:bg-purple-700 active:scale-95 transition " onClick={handleLogin}>
                 Login
               </button>
          </div>
          

        </div>
      </div>
    </div>
  )
}

export default Login

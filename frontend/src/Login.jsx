import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";

const Login = () => {
    const[pass, setPass] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(pass);
        if(pass.trim() == 'sabari'){
            localStorage.setItem("loginpassword",JSON.stringify(pass));
            navigate('/addprod');
        }else{
            setError(true);
            setTimeout(() => {
                setError(false)
            },2000);
        }

    }

    return (
        <div>
            {error && <p className='wrongsubmit'>Wrong Password</p>}
            <div className='login-container'>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Enter password' onChange={(e) => setPass(e.target.value)}/>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login
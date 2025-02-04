import React, { useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import './Login.css';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Formik,Form,ErrorMessage,Field} from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../../authContent';


function Login() {

    const nagivate=useNavigate();
 
    const [loading,setLoading]=useState(false);
    const {setCurrentUser}=useAuth();

    let handleForm=async(formData)=>{
        setLoading(true);

        try{
            const res=await axios.post("http://localhost:4000/user/login",formData);
        
                if(res.data.success){
                    localStorage.setItem("token",res.data.token);
                    localStorage.setItem("userId",res.data.userId);
                    localStorage.setItem("username",res.data.username);
                    setCurrentUser(res.data.userId);
                    toast.success(res.data.message);
                    nagivate('/')
                    
                }
    
        }
        catch(e){
            toast.error(e.response.data.message);
            setLoading(false);
        }

        
    }

    const validate=Yup.object({
        email:Yup.string().email("enter valid email").required("*Required"),
        password:Yup.string().required("*Required")
    })


    return (
        <Formik
       
        initialValues={{email:'',password:''}}
        validationSchema={validate}
        onSubmit={handleForm}
        >
        {()=>(

        <div className='w-[80%] h-[80vh]  mt-[2rem] flex items-center justify-center mx-auto md:w-[50%]'>
            <Form className='flex flex-col justify-center '>

            <h2 className='font-semibold text-4xl my-5'>Login! | DeskFit</h2>
            <div className='flex gap-1'>
            <label htmlFor="email" className='font-semibold'>Email</label>
            <ErrorMessage name='email' component="div" className='text-red-500' />
            </div>

            <Field  id="email" className='rounded border  p-1 border-blue-500 my-2' type="email" placeholder="enter email" name="email" />
            <div className='flex gap-1'>
            <label htmlFor="password" className='font-semibold'>Password</label>
            <ErrorMessage name='password' component="div" className='text-red-500' />
            </div>
            <Field id="password"  className='rounded p-1 border border-blue-500 my-2' type="password" name="password" placeholder="password" />
            
            <button disabled={loading} className=' my-1 rounded bg-black text-white p-1 font-semibold' type='submit'>{loading?"Loading...":"Login"}</button>
            <Link to={"/signup"} >New User, <span className='text-decoration-line: underline'>Register Now!</span></Link>
            </Form>
        </div>
        )}
        </Formik>
     );
}

export default Login;
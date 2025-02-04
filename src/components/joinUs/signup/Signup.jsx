import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Formik,Form,Field,ErrorMessage  } from 'formik';
import * as Yup from 'yup'; 
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../authContent';


function Signup() {
    
    const [loading,setLoading]=useState(false);
    const {setCurrentUser}=useAuth();
    const navigate=useNavigate();

    let handleForm=async(formData)=>{
        setLoading(true);
        await axios.post("https://backend-deskfit.vercel.app/user/signup",formData)
        .then((res)=>{
            if(res.data.success){
                    toast.success(res.data.message);
                    localStorage.setItem("token",res.data.token);
                    localStorage.setItem("userId",res.data.userId);
                    localStorage.setItem("username",res.data.username);
                    setCurrentUser(res.data.userId);
                    navigate('/');
            }
          
        })
        .catch((e)=>{ 
            toast.error(e.response.data.message); 
            setLoading(false); 
        });
    }

    const validate=Yup.object({
        username: Yup.string().min(4,"minimum 4 characters/more").required("*Required"),
        email:Yup.string().email("email is invalid").required("*Required"),
        password:Yup.string().min(5,"minimum 5 digit/character").required("*Required")
    })



    return (
        <Formik
        initialValues={{username:'',email:'',password:''}}
        validationSchema={validate}
        onSubmit={handleForm}
        >

        {()=>(

            <div className='w-[80%] h-[80vh]  mt-[2rem] flex items-center justify-center mx-auto md:w-[50%]'>
            <Form className='flex flex-col justify-center'>
            <h2 className='font-semibold text-4xl my-5'>SignUp to join Us</h2>
            <div className='flex gap-1'>
            <label htmlFor="username" className='font-semibold'>Username</label>
            <ErrorMessage name="username" component="div" className="text-red-500 " />
            </div>
            
            <Field  id="username" className='rounded border  p-1 border-blue-500 my-2' 
                    type="text" 
                    placeholder='username' 
                    name='username' />

            <div className='flex gap-1'>
            <label htmlFor="email" className='font-semibold'>Email</label>
            <ErrorMessage name="email" component="div" className="text-red-500" />
            </div>
            <Field   id="email" className='rounded border  p-1 border-blue-500 my-2' type="text" placeholder='enter email'name='email' />

            <div className='flex gap-1'>
            <label htmlFor="password" className='font-semibold'>Password</label>
            <ErrorMessage name="password" component="div" className="text-red-500" />
            </div>
            <Field  id="password" className='rounded p-1 border border-blue-500 my-2' type="password" name="password" placeholder='password' />

            <button disabled={loading} className='rounded bg-black text-white p-1 my-1 font-semibold' type='submit'>{loading?"Loading...":"Sign up"}</button>
            <Link to={"/login"} >Already have an account, <span className='text-decoration-line: underline'>Login</span></Link>
            
            </Form>
        </div>


        )}
     
        </Formik>  
     );
}

export default Signup;

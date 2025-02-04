import React, { useEffect, useState } from 'react';
import './exercisecard.css';
import axios from 'axios';
import Card from './Card';
import Hero from '../hero/Hero';
import { toast } from 'react-hot-toast';


function ExerciseCard(){
    const [isExercise,setIsExercise]=useState([]);
    
    useEffect(()=>{
        fetchExercises();
    },[])


    let fetchExercises=async()=>{
        await axios.get("http://localhost:4000/")
        .then((res)=>{
           
            if(res.status!==200){
            toast.error(res.data.message);    
            }
            else{
                setIsExercise(res.data.data);
            }
           
        })
        .catch((e)=>{
            toast.error(e.message);
        })
    }

    
    return(
        <>
        <Hero/>
        <div className=' w-full grid gap-3 grid-cols-auto-fit-100 place-content-center'>
        
        {isExercise.map((card,idx)=>{
            return (
            <Card value={card} key={idx} />
            )
        })}

       </div>
       </>
   
    )
}

export default ExerciseCard;

import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';
import ExecrciseInfo_details from './ExerciseInfo_details';
import ExerciseInfo_content from './ExerciseInfo_content';
import axios from 'axios';
import toast from 'react-hot-toast';



function ExerciseInfo(){
    const {id}=useParams();    
    const [exerciseInfo,setExerciseInfo]=useState(null);

    useEffect(()=>{
            getExerciseInfo()
        },[id])
    
    let getExerciseInfo=async()=>{
            await axios.get(`http://localhost:4000/exercise-info/${id}`)
            .then((res)=>{
                if(res.data.success){
                    toast.success(res.data.message);
                    setExerciseInfo(res.data.data);                    
                    
                }
                
                
            })
            .catch((e)=>{
                toast.error(e.response.data.message);
            })
    }
    
    if(!exerciseInfo) return <h4 style={{textAlign:'center'}}>Loading...</h4>

    return(
        <div className='exercise-info font-medium flex flex-col justify-center mx-auto w-[80%] my-2 mt-[5rem] lg:w-[40%] md:w-[50%] p-2'>
            
            <ExerciseInfo_content value={exerciseInfo}/>
            <ExecrciseInfo_details value={exerciseInfo}/> 
           
        </div>
    )
}

export default ExerciseInfo;
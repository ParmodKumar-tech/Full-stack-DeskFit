import React, { useState } from 'react'
import ReactPlayer from 'react-player';


export default function ExerciseInfo_content(props) {
    const [howtodobtnclick, setHowtodobtnclick]=useState(false);

    const [animationbtnclick, setAnimationbtnclick]=useState(true);
  

    let handleHowtodobtn=()=>{
        if(!howtodobtnclick){
            setHowtodobtnclick(true);
            setAnimationbtnclick(false)
        }
        
    }
    
    let handleAnimation=()=>{
        if(!animationbtnclick){
            setAnimationbtnclick(true);
            setHowtodobtnclick(false);
        }
       
    
    }



  return (
    <div>
        <h2 className='text-black text-xl font-medium my-1'>{props.value.name?props.value.name:"..."}</h2>
                  {animationbtnclick && <img 
                  className='bg-red-400 h-[20rem] w-screen mx-auto' 
                  src={props.value.gifAnimation} 
                  alt='exercise-img'/>}
                  {howtodobtnclick && <ReactPlayer className="border border-stone-950" url={props.value.url} controls={true} width="100%" height="20rem" />}
                  <div className='flex justify-between my-2'>
                    <button 
                      onClick={handleAnimation} 
                      className={animationbtnclick ? 
                      'bg-[#0077ff] font-bold  rounded-xl border-2 border-black px-4 py-1 text-white' :
                      'font-bold rounded-xl px-4 py-1 text-black border  border-gray-800 '}>
                        Animation
                    </button>
                      
                    <button 
                      onClick={handleHowtodobtn} 
                      className={howtodobtnclick ? 
                      'bg-[#0077ff] font-bold rounded-xl border-2 border-black px-4 py-1 text-white' :
                      'font-bold rounded-xl px-4 py-1 text-black  border border-gray-800 '}>
                        How to do
                    </button>

                  </div>
      
    </div>
  )
}

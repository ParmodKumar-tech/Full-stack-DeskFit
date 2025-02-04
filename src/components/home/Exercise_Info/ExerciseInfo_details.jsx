import React from 'react';

export default function ExecrciseInfo_details(props){

    
    return(
    <>
        <div className='flex justify-between my-2'>
                <h3 className='text-[#0077ff] font-bold'>DURATION</h3>
                <p>{props.value.duration?props.value.duration:"..."}</p>
            </div>

            <div className=' my-2'>
                <h3 className='text-[#0077ff] font-bold'>INSTRUCTIONS</h3>
                <ul className='list-disc list-inside'>
                {props.value.instructions?.map((res,idx)=>(
                        <li key={idx}>{res}</li>
                ))}
   
                </ul>
                
            </div>

            <div className='exercise-focus-area my-2'>
                <h3 className='text-[#0077ff] font-bold'>FOCUS AREA</h3>
                <ul className='list-disc list-inside '>
                    {props.value.focusArea?.map((res,idx)=>(
                        <li key={idx}>{res}</li>
                    ))}
                    
                  
                </ul>
            </div>

            <div className='exercise-common-mistakes my-2'>
                <h3 className='text-[#0077ff] font-bold'>COMMON MISTAKES</h3>
                <ul className='list-disc list-inside '>
                    {props.value.commonMistakes?.map((res,idx)=>(
                        <li key={idx}>{res}</li>
                    ))}
                
                </ul>
               
            </div>

            <div className='exercise-breathing-tips my-2'>
                <h3 className='text-[#0077ff] font-bold'>BREATING TIPS</h3>
                <ul className='list-disc list-inside'>
                {props.value.breathingTips?.map((res,idx)=>(
                    <li key={idx}>{res}</li>
                ))}
                
               </ul>
               
            </div> 
            </>
    )
}
import React from 'react'
import { Link } from 'react-router-dom'

export default function Card(props) {
    return (
        <Link key={props.value._id} to={`/exercise-info/${props.value._id}`} >
        <div  className='h-[19rem] py-2 my-1 rounded-lg border border-cyan-800' >
        <img className='w-[80%] h-[12rem] mx-auto ' src={props.value.gifAnimation} alt="exercise-img" />
        <h3 className='w-[80%] mx-auto font-semibold'>{props.value.name}</h3>
        <p className='w-[80%] mx-auto' >{props.value.duration}</p>
        </div>
        </Link>
    
  )
}

import React, { useEffect } from 'react';
import { useNavigate,useRoutes } from 'react-router-dom';
import Login from './components/joinUs/login/Login';
import Signup from './components/joinUs/signup/Signup';
import AddExercise from './components/addExercise/AddExercise'
import ExerciseInfo from './components/home/Exercise_Info/ExerciseInfo';
import ExerciseCard from './components/home/Exercise_card/Exercisecard';
import { useAuth } from './authContent';
import NotFound from './components/notFound/NotFound';




const PageRoutes=()=>{
    const {currentUser,setCurrentUser}=useAuth();
    const navigate=useNavigate();
    
    useEffect(()=>{
        const userIdFromStorage=localStorage.getItem("userId");

        if(userIdFromStorage && !currentUser){
            setCurrentUser(userIdFromStorage);
        }

        if(!userIdFromStorage && window.location.pathname=="/add-exercise"){
            
            navigate("/login");
        }
        if(userIdFromStorage && window.location.pathname=='/login'){
            navigate("/")
        }
    },[currentUser,navigate,setCurrentUser]); // if any of these value is change , it do reload...

    let elements=useRoutes([
        {path:'/', element:<><ExerciseCard/></>},
        {path:'/exercise-info/:id', element:<ExerciseInfo/>},
        {path:'/signup', element:<Signup/>},
        {path:'/login', element:<Login/>},
        {path:"/add-exercise",element:<AddExercise/>},
        {path:"*",element:<NotFound/>},
        
        
    ])
    
    return elements;

}
export default PageRoutes;


import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, ErrorMessage, Field,FieldArray } from 'formik';
import * as Yup from 'yup';

import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';


function AddExercise() {
    const nagivate=useNavigate();

    const [isLoading,setIsLaoding]=useState(false);
    const [instrucValue,setInstrucValue]=useState(' ');
    const [foucsAreaValue,setFoucsAreaValue]=useState(' ');
    const [commonMistakeValue,setCommonMistakeValue]=useState(' ');
    const [breathingTipsValue,setBreathingTipsValue]=useState(' ');

    const handleSubmit = async (formData) => {
       
        setIsLaoding(true);
        if(formData.gifAnimation){
            const data=new FormData();
            data.append("file",formData.gifAnimation);
            data.append("upload_preset","DeskFit_gif");
            data.append("cloud_name","dhrqts9ml");
            
            await axios.post("https://api.cloudinary.com/v1_1/dhrqts9ml/image/upload",data)
            .then((res)=>{
                formData.gifAnimation=res.data.url;

            })
            .catch((e)=>{
                toast.error(e.message);
            })
        }

        try {
           const res=await axios.post("http://localhost:4000/add-exercise",formData);
            if(res.data.success){
                toast.success("Exercise Add Succesfully!");
                nagivate("/");
            }
            
        } catch (e) {
           toast.error(e.response.data.message);
           setIsLaoding(false)

        }
    };

    const validate = Yup.object({
        name: Yup.string().required("*Required"),
        gifAnimation: Yup.mixed()
            .required("*Required")
            .test("FILE_TYPE", "*File should be a gif", (value) => {
                return value && value.type === "image/gif";
            }),
        url: Yup.string().required("*Required"),
        duration: Yup.string().required("*Required"),                                      // here through the .test i want to check that if one items is exists in array , so it free form validation error. this is actually i want please provide me code for this??
        
        instructions: Yup.array()
        .of(Yup.string())
        .min(1, "*Add at least one instruction"),
    focusArea: Yup.array()
        .of(Yup.string())
        .min(1, "*Add at least one focus area"),
    commonMistakes: Yup.array()
        .of(Yup.string())
        .min(1, "*Add at least one common mistake"),
    breathingTips: Yup.array()
        .of(Yup.string())
        .min(1, "*Add at least one breathing tip"),
   
    
    });

    return (
        <>
            <div className="exercise-info font-medium flex flex-wrap flex-col justify-center mx-auto w-[80%] h-[100%] my-4 mt-[3rem] lg:w-[40%]  md:w-[50%] ">
                <h1 className="bold text-2xl my-7 underline underline-offset-auto">Add Exercise Information</h1>
                <Formik
                    initialValues={{
                        name: '',
                        gifAnimation: '',
                        url: '',
                        duration: '',
                        instructions:[],
                        focusArea:[],
                        commonMistakes:[],
                        breathingTips: [],
                    }}
                    validationSchema={validate}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue }) => (
                        <Form>
                            <div className="flex justify-between my-2">
                                <h3 className='text-[#0077ff] font-bold'>NAME</h3>
                                <div>                               
                                    <Field
                                    className="border border-sky-500 p-2"
                                    type="text"
                                    placeholder="Exercise name"
                                    name="name"
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                                </div>
 
                            </div>

                            <div className="flex justify-between my-2">
                                <h3 className='text-[#0077ff] font-bold'>Upload GIF</h3>
                                <div>
                                <input
                                    className="border border-sky-500 p-2"
                                    type="file"
                                    name="gifAnimation"
                                    accept="image/gif"
                                    onChange={(event) => setFieldValue("gifAnimation", event.target.files[0])}
                                />
                                <ErrorMessage name="gifAnimation" component="div" className="text-sm text-red-500" />
                                </div>
                            </div>

                            <div className="flex justify-between my-2">
                                <h3 className='text-[#0077ff] font-bold'>Video URL</h3>
                                <div>
                                <Field
                                    className="border border-sky-500 p-2"
                                    type="url"
                                    name="url"
                                    placeholder="Video url"
                                />
                                <ErrorMessage name="url" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>

                            <div className="flex justify-between my-2">
                                <h3 className='text-[#0077ff] font-bold'>DURATION</h3>
                                <div>
                                <Field
                                    className="border border-sky-500 p-2"
                                    type="text"
                                    placeholder="Duration"
                                    name="duration"
                                />
                                <ErrorMessage name="duration" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>

                            <div className="flex justify-between exercise-instruction my-7">
                                <h3 className='text-[#0077ff] font-bold'>INSTRUCTIONS</h3>
                                <div>
                            
                                <FieldArray name="instructions">
                                
                                {(arrayHelpers) => {
                                const { push, remove, form } = arrayHelpers;

            return (
                <>
                    <Field
                        className="border border-sky-500 p-2"
                        placeholder="Instructions"
                        name="instructions"
                        value={instrucValue}
                        onChange={(e) => setInstrucValue(e.target.value)}
                    />
                    <Link
                        onClick={() => {
                            if (instrucValue.trim()) {
                                push(instrucValue.trim()); // Add the full string to the array
                                setInstrucValue(""); // Clear the input after adding
                            }
                        }}
                        id="instructions"
                        className="bg-black text-white p-1 rounded"
                    >
                        Add
                    </Link>


                    <ul>
                        
                        {form.values.instructions.map((instruction, index) => (
                            <li key={index}>
                                {instruction}
                                <button
                                    type="button"
                                    onClick={() => remove(index)} // Remove an item from the array
                                    className="ml-2 text-red-500 text-sm"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            );
        }}
                                </FieldArray>

                                    <div className='flex flex-wrap gap-2'>                          
                                    <ErrorMessage name="instructions" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    
                                </div>
                            </div>

                            <div className="flex justify-between exercise-focus-area my-7">
                                <h3 className='text-[#0077ff] font-bold'>FOCUS AREA</h3>
                                <div>    
                                <FieldArray name="focusArea">
                                
                                {(arrayHelpers) => {
                                const { push, remove, form } = arrayHelpers;

            return (
                <>
                    <Field
                        className="border border-sky-500 p-2"
                        placeholder="Focus Area"
                        name="focusArea"
                        value={foucsAreaValue}
                        onChange={(e) => setFoucsAreaValue(e.target.value)}
                    />
                    <Link
                        onClick={() => {
                            if (foucsAreaValue.trim()) {
                                push(foucsAreaValue.trim()); // Add the full string to the array
                                setFoucsAreaValue(""); // Clear the input after adding
                            }
                        }}
                        id="focusArea"
                        className="bg-black text-white p-1 rounded"
                    >
                        Add
                    </Link>

                    
                    <ul>
                        
                        {form.values.focusArea.map((focusArea, index) => (
                            <li key={index}>
                                {focusArea}
                                <button
                                    type="button"
                                    onClick={() => remove(index)} // Remove an item from the array
                                    className="ml-2 text-sm text-red-500"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            );
        }}
                                </FieldArray>
                                    <div className='flex flex-wrap gap-2'>
                                    <ErrorMessage name="focusArea" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    
                                </div>
                            </div>
                           
                            
                            <div className="flex justify-between exercise-common-mistakes my-7">
                                <h3 className='text-[#0077ff] font-bold'>COMMON MISTAKES</h3>
                                <div>
                                <FieldArray name="commonMistakes">
                            
                            {(arrayHelpers) => {
                            const { push, remove, form } = arrayHelpers;

        return (
            <>
                <Field
                    className="border border-sky-500 p-2"
                    placeholder="Common Mistakes"
                    name="commonMistakes"
                    value={commonMistakeValue}
                    onChange={(e) => setCommonMistakeValue(e.target.value)}
                />
                <Link
                    onClick={() => {
                        if (commonMistakeValue.trim()) {
                            push(commonMistakeValue.trim()); // Add the full string to the array
                            setCommonMistakeValue(""); // Clear the input after adding
                        }
                    }}
                    id="commonMistakes"
                    className="bg-black text-white p-1 rounded"
                >
                    Add
                </Link>

                
                <ul>
                    
                    {form.values.commonMistakes.map((commonMistake, index) => (
                        <li key={index}>
                            {commonMistake}
                            <button
                                type="button"
                                onClick={() => remove(index)} // Remove an item from the array
                                className="ml-2 text-sm text-red-500"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </>
        );
                                                }}
                                </FieldArray>
                                    <div className='flex flex-wrap gap-2'>                      
                                    <ErrorMessage name="commonMistakes" component="div" className="text-red-500 text-sm" />
                                    </div>
                                </div>
                           
                            </div>

                            <div className="flex justify-between exercise-breathing-tips my-7">
                                <h3 className='text-[#0077ff] font-bold'>BREATHING TIPS</h3>                              
                                <div>  
                                    <FieldArray name="breathingTips">
                                
                                {(arrayHelpers) => {
                                const { push, remove, form } = arrayHelpers;

            return (
                <>
                    <Field
                        className="border border-sky-500 p-2"
                        placeholder="Focus Area"
                        name="breathingTips"
                        value={breathingTipsValue}
                        onChange={(e) => setBreathingTipsValue(e.target.value)}
                    />
                    <Link
                        onClick={() => {
                            if (breathingTipsValue.trim()) {
                                push(breathingTipsValue.trim()); // Add the full string to the array
                                setBreathingTipsValue(""); // Clear the input after adding
                            }
                        }}
                        id="breathingTips"
                        className="bg-black text-white p-1 rounded"
                    >
                        Add
                    </Link>

                    
                    <ul>
                        
                        {form.values.breathingTips.map((breathingTip, index) => (
                            <li key={index}>
                                {breathingTip}
                                <button
                                    type="button"
                                    onClick={() => remove(index)} // Remove an item from the array
                                    className="ml-2 text-sm text-red-500"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            );
        }}
                                    </FieldArray>       
                                    <div className='flex flex-wrap gap-2'>
                                                                    
                                    <ErrorMessage name="breathingTips" component="div" className="text-red-500 text-sm" />
                                    </div>
                                </div>
                            </div>
                            

                            <div className="flex justify-between my-2">
                                <button
                                    disabled={isLoading}
                                    className="w-full font-bold rounded px-4 py-1 border border-gray-800 hover:text-cyan-400"
                                    type="submit"
                                >
                                    {isLoading?"Loading...":"Submit"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
}

export default AddExercise;

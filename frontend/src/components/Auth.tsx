import  { ChangeEvent,  useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { SignupInput } from '@rishav-kumar/blog-common';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import {  useSetRecoilState } from 'recoil';
import { loginState } from '../loginState';


const Auth = ({type}:{type :'signup' | 'signin'}) => {

    const [postInputs,setPostInputs] = useState<SignupInput>({
        name:'',
        username:'',
        password:''
    });
    const navigate = useNavigate();
     // const setLogin = useSetRecoilState(loginState);
     const setLogin = useSetRecoilState(loginState)

   async function sendRequest(){
    try {
        const response =    await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs);
        // console.log(response)
        const jwt = response.data;
        localStorage.setItem("token",jwt);
        setLogin(true);
        
         
        navigate("/blogs")
    } catch (error) {
        alert("Error while signing up")
    }
     
    }
  return (
        <div className='bg-white-200 h-screen flex justify-center flex-col'>
        <div className='flex justify-center '>
        <div>
        <div >
            <div className='text-3xl font-extrabold'> 
                {type==="signin" ? "Login" : "Create an account"}
            </div>
            <div className='text-slate-400'>
            {type==="signin" ? "Don't have an account?" :"Already have an account"} <Link onClick={()=>console.log('Type',type)} className='pt-2 text-blue-600 underline' to={type==="signup" ? "/signin" : '/signup'}>{type==="signin"?"Signup":"Login"}</Link>
            </div>
            </div>
            <div className='mt-2'>
           {type==="signup" ? <LabeledInput type={'text'}label='Name' placeholder='Rishav kumar' onChange={(e)=>{
            setPostInputs({...postInputs,name:e.target.value})
        }} />:null}
            <LabeledInput type={'text'} label='Email' placeholder='rk@gmail.com' onChange={(e)=>{
            setPostInputs({...postInputs,username:e.target.value})
        }} />
            <LabeledInput type={'password'} label='Password' placeholder='minimum length 5' onChange={(e)=>{
            setPostInputs({...postInputs,password:e.target.value})
        }} />
        <button onClick={sendRequest} type="button" className=" mt-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 w-full">{type==="signup" ?"Signup" : "Login"}</button>
            </div>
        
     </div>
    </div>
</div>
  )
}

interface LabeldInputType{
    label:string;
    placeholder:string;
    onChange:(e:ChangeEvent<HTMLInputElement>)=> void;
    type?:string
}

function LabeledInput({label,placeholder,onChange,type}:LabeldInputType){
    return <div>
        <label  className=" mt-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
        <input onChange={onChange} type={type}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
            
    </div>

}

export default Auth
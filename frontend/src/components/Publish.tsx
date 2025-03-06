
import { ChangeEvent, useState } from 'react'
import Appbar from './Appbar'
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

const Publish = () => {
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');

    const navigate = useNavigate();
   

    
  return (
   <div>
    <Appbar />
    <div className='flex justify-center w-full mt-2 '>
        <div className='max-w-screen-lg w-full'>
    <input value={title} onChange={(e)=>{
        setTitle(e.target.value)
    }} type="text" placeholder='Write your title here' className="focus:outline-none block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
     </div>
   
    </div>
    <div className='flex justify-center w-full mt-2'>
        <div className='max-w-screen-lg w-full'>
    <TextEditor value={content} onChange={(e)=>{setContent(e.target.value)}}/>
    <button onClick={async ()=>{
     const response =   await axios.post(`${BACKEND_URL}/api/v1/blog`,{
        title,
        content
     },{
        headers:{
            Authorization:localStorage.getItem('token')
        }
     })
     setContent('');
     setTitle('');
     navigate(`/blog/${response.data.id}`)
    }} type="submit" className=" inline-flex items-center px-5 py-2.5 mt-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 ">
       Publish post
   </button>
    </div>
    </div>
  
   </div>
  )
}

function TextEditor({value,onChange}:{value:string,onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void}){
    return (
        <div>
        

<textarea onChange={onChange} value={value} id="message" rows={6} className=" focus:outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white  " placeholder="Write your thoughts here..."></textarea>


    </div>
    )
}

export default Publish
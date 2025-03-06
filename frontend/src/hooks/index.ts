import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";


export interface Blog{
    
        content: string;
        title:string;
        id: number;
        author: {
            name: string;
        }
    
}

export const useBlog = ({id}:{id:string})=>{
    const [blog,setBlog] = useState<Blog>();
  const [loading,setIsLoading] = useState(true);
  
  useEffect(()=>{
    const fetchData = async ()=>{
const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
  headers:{
    Authorization:localStorage.getItem("token")
}
}
  
)
console.log(response.data.blog)
   setBlog(response.data.blog);
   setIsLoading(false);

    }
    fetchData();
  },[id])
return {blog,loading}
}

export const useBlogs = ()=>{
    const [loading,setIsLoading] = useState(true);
    const [blogs,setBlogs] = useState<Blog[]>([]);

    useEffect(()=>{

        const fetchData = async ()=>{
            try{
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
                    headers:{
                        Authorization:localStorage.getItem("token")
                    }
                });
                //console.log(response)
                setBlogs(response.data.blogs);
                setIsLoading(false);
            }catch(e){
                console.log(e);
                alert('something went wrong')
                
            }
        }
        fetchData();



    },[])
    return {loading,blogs}
}
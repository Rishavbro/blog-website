import { Link } from "react-router-dom";

interface BlogCardProps{
    id:number;
    authorName:string;
    title:string;
    content: string;
    publisheDate: string;
}

const BlogCard = ({authorName,title,content,publisheDate,id}:BlogCardProps) => {
  return ( <Link to={`/blog/${id}`}>
    <div className="border-b border-slate-200 p-4 mt-2 w-screen max-w-screen-md cursor-pointer">
        <div className="flex mt-2">
            <div className=" mr-1">
            <Avatar name={authorName} /> 
            </div>
       
       <div className="font-extralight pl-2 text-sm flex justify-center flex-col ">{authorName}</div> 
     <div className=" pl-2 flex justify-center flex-col"> <Circle /></div>
       <div className="pl-2 font-thin text-slate-400 flex justify-center flex-col"> {publisheDate}</div>
    </div>
    <div className="text-xl font-semibold pt-2">
        {title}
    </div>
    <div className="text-md font-thin"> 
        {content.slice(0,100)+ "..."}
    </div>
    <div className="text-slate-500 text-sm font-thin pt-4">
        {`${Math.ceil(content.length / 100)} minute(s) read`}
    </div>
    <div className="bg-slate-300 h-1 w-full"></div>
    </div>
    </Link>
  )
}

export function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-800">

    </div>
}

export function Avatar({name}:{name:string}){
    return <div className={`relative inline-flex items-center justify-center h-6 w-6 overflow-hidden bg-gray-300 rounded-full dark:bg-gray-600`}>
    <span className="font-medium text-gray-600 dark:text-gray-300">{name.slice(0,1)}</span>
</div>
}

export default BlogCard
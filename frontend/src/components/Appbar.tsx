import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"


const Appbar = () => {
  return (
    <div className="border-b flex justify-between px-18 py-4 max-h-16">
     <Link to={`/blogs`}>
     <div className="flex flex-col justify-center cursor-pointer">
            Medium
        </div>
     </Link>


<div className="flex justify-center">
       <Link to={`/publish`}>
     
     <button type="button" className="cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"> New</button>
     
     </Link>
         
     <div className="flex justify-center flex-col">
            <Avatar name="Rishav" />
        </div>
     
</div>
    
    </div>
  )
}

export default Appbar
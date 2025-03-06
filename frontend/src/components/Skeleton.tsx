import { Circle } from "./BlogCard"

const Skeleton = () => {
  return (
    <div className="border-b border-slate-200 p-4 mt-2 w-screen max-w-screen-md cursor-pointer">
            <div className="flex mt-2">
                <div className=" mr-1">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                </div>
           
           <div className="font-extralight pl-2 text-sm flex justify-center flex-col ">
           <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            </div> 
         <div className=" pl-2 flex justify-center flex-col"> <Circle /></div>
           <div className="pl-2 font-thin text-slate-400 flex justify-center flex-col"> 
           <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
           </div>
        </div>
        <div className="text-xl font-semibold pt-2">
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        </div>
        <div className="text-md font-thin"> 
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        </div>
        <div className="bg-slate-300 h-1 w-full"></div>
        </div>
    
        

  )
}

export default Skeleton
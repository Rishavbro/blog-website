
import Appbar from './Appbar'
import { Blog } from '../hooks'
import { Avatar } from './BlogCard'

const FullBlog = ({blog}:{blog:Blog}) => {
  return (
  <div>
    <Appbar />
    <div className='flex justify-center'>
    <div className='grid grid-cols-12 gap-2 px-10 w-full  max-w-screen-xl pt-12'>
        <div className='col-span-8  '>
            <div className='text-3xl font-extrabold '>
                {blog.title}
            </div>
            <div className='text-slate-500 pt-2'>
                Posted on(2dec 2020)
            </div>
            <div className='pt-4'>
                {blog.content}
            </div>
        </div>
        <div className='col-span-4  '>
            About Author
            <div className='flex w-full mt-2  '>
                <div className='pr-2 flex flex-col justify-center'>
                <Avatar name={blog.author.name || "Anonumys"}  />
                </div>
         <div>
         <div className='font-bold  text-2xl'>
            {blog.author.name || "Anonymus"}
            </div>
         </div>
         </div>
            <div className='pt-2 text-slate-400'>
                Rabdom catch phrase by author to get reader attention
            </div>
            </div>
        </div>
        
    </div>
  </div>
  )
}

export default FullBlog
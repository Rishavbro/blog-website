
import BlogCard from '../components/BlogCard'
import Appbar from '../components/Appbar'
import { useBlogs } from '../hooks'
import Skeleton from '../components/Skeleton';

const Blogs = () => {
  const {loading,blogs} = useBlogs();

  if(loading){
    return <div>
      <Appbar />
      <div className='flex justify-center '>
      <div>
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      </div>
  
    </div>
    </div>
  }

  return (
<div>
  <Appbar />
  <div className='flex justify-center '>
<div >
       {blogs.map((blog)=>{
        return <BlogCard id={blog.id} title={blog.title} content={blog.content} publisheDate='25'  authorName={blog.author.name || "Anonymus"}/>
       })}
    </div>
    </div>
</div>
  )
}

export default Blogs
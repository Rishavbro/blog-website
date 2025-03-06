import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import FullBlog from "../components/FullBlog";

import Appbar from "../components/Appbar";
import Spinner from "../components/Spinner";



const Blog = () => {
  const {id} = useParams();
  const {blog,loading} = useBlog({
    id:id || ''
  });
  
  

if(loading || !blog){

  return  <div>
    <Appbar />
    <div className="flex flex-col justify-center h-screen">
    <div className="flex justify-center">
<Spinner />

    </div>
  </div>
  </div>
}

return (
  <div>
<FullBlog blog={blog} />
  </div>
)
}

export default Blog
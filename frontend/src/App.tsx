import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Blog from './pages/Blog';
import Blogs from './pages/Blogs';
import Publish from './components/Publish';
import { Navigate } from 'react-router-dom';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route  path='/publish' element={<Publish />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
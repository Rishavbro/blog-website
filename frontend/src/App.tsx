import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Blog from './pages/Blog';
import Blogs from './pages/Blogs';
import Publish from './components/Publish';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginState } from './loginState';
import { Outlet } from 'react-router-dom';


function App() {

const login = useRecoilValue(loginState);
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            login ? (
              <Navigate to="/blogs" replace />
            ) : (
              <Navigate to="/signup" replace />
            )
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/publish" element={<Publish />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

function ProtectedRoute() {
  const login = useRecoilValue(loginState);
  const location = useLocation();

  if (!login) {
    return <Navigate to="/signup" replace state={{ from: location }} />;
  }

  return <Outlet />;
}


export default App
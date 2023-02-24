import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, Route, Routes } from 'react-router';
import Home from './pages/Home';
import Headers from './components/Headers';
import Login from './pages/auth_pages/Login';
import SignUp from './pages/auth_pages/SignUp';
import Profile from './pages/Profile';
import Create from './pages/crud/Create';
import Update from './pages/crud/Update';
import DetailPage from './pages/DetailPage';
import NotFound from './pages/NotFound';
import RequireAuth from './pages/auth_pages/RequireAuth';
import { useSelector } from 'react-redux';



const App = () => {

  const { user } = useSelector((store) => store.user)

  return (
    <>
      <Headers />


      <Routes>
        <Route path='/' element={<Home />} />

        <Route element={<RequireAuth />}>
          <Route path='create/post' element={<Create />} />
          <Route path='update/post' element={<Update />} />
          <Route path='user/profile' element={<Profile />} />
        </Route>

        <Route path='/user/login' element={user === null ? <Login /> : <Navigate to='/' replace />} />
        <Route path='/postDetail' element={<DetailPage />} />
        <Route path='/user/signUp' element={<SignUp />} />

        <Route path='*' element={<NotFound />} />
      </Routes>





      <ToastContainer autoClose={1000} position='top-right' />
    </>
  )
}

export default App

import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'
import { clearUser } from '../features/auth/userSlice';


const Headers = () => {

  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const links = [
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];


  return (
    <div className='bg-[#032541] flex justify-between py-2 px-10 text-white items-baseline z-50 sticky top-0'>


      <div>


        <NavLink to='/' replace={true}> <h1 className='text-2xl'>Blog</h1></NavLink>


        {/* {toggle === true && <div className='flex-col mt-2 space-y-2 hidden sm:flex  '>
          {links.map((l, i) => {
            return <NavLink onClick={() => dispatch(change())} className='menu-item' key={i} to={l.path}>{l.name}</NavLink>;
          })}
        </div>} */}
      </div>




      {/* {toggle === true ? <button className='hidden sm:block mt-1' onClick={() => dispatch(change())} > <i className="fa-solid fa-xmark fa-xl"></i></button> : <button onClick={() => dispatch(change())} className='hidden  sm:block mt-1'><i className="fa-solid fa-bars fa-xl "></i></button>
      } */}




      {user === null ? <NavLink className='menu-item' to='/user/login'>Login</NavLink> :
        <div className='space-x-5  flex items-center'>
          <NavLink className='menu-item' to='/create/post'>Create</NavLink>
          <NavLink className='menu-item' to='/user/profile'>Profile</NavLink>
          <button onClick={
            () => {
              dispatch(clearUser());
            }
          }>LogOut</button>
        </div>
      }





    </div>
  )
}

export default Headers

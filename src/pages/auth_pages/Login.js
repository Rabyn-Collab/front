import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useUserLoginMutation } from '../../features/auth/authApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { addUser } from '../../features/auth/userSlice';


const Login = () => {

  const dispatch = useDispatch();
  const nav = useNavigate();
  const [userLogin, { isError, isLoading, error }] = useUserLoginMutation();


  const loginSchema = Yup.object().shape({
    email: Yup.string().required('email is required'),
    password: Yup.string().min(5, 'Too short').max(50, 'Too Long').required('password is required'),
  });


  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async (val) => {
      try {
        const user = {
          email: val.email,
          password: val.password
        };
        const response = await userLogin(user).unwrap();
        dispatch(addUser(response.data))
        toast.success('successfully login');
        nav(-1);
      } catch (err) {

        toast.error(err.data.message);

      }

    },
    validationSchema: loginSchema
  });


  return (
    <div>


      <form onSubmit={formik.handleSubmit} className='flex justify-center  items-center max-h-2xl '>
        <div className='w-[40%] mt-20 shadow-2xl bg-white p-4 space-y-4 '>

          <div className='flex justify-between'>
            <h1 className='text-2xl '>Login User</h1>

          </div>

          <div className='flex flex-col space-y-2'>
            <label htmlFor="email">Email</label>
            <input onChange={formik.handleChange} value={formik.values.email}
              className='border border-gray-500 outline-none px-2 py-1' type="email" id='email' name='email' placeholder='email' />
            {formik.errors.email && formik.touched.email ? <h1 className='text-pink-700'>{formik.errors.email}</h1> : ''}
          </div>

          <div className='flex flex-col space-y-2'>
            <label htmlFor="password">Password</label>
            <input
              className='border border-gray-500 outline-none px-2 py-1'
              onChange={formik.handleChange} value={formik.values.password} name="password"
              type='password' placeholder='password'
              id="password" />
            {formik.errors.password && formik.touched.password ? <h1 className='text-pink-700'>{formik.errors.password}</h1> : ''}
          </div>

          <div>


            <button className='bg-blue-500 p-2 w-[40%] rounded' type='submit'>

              {isLoading === true ? <div className='h-7 w-7 mx-auto rounded-full   border-2 border-black border-t-white animate-spin'>
              </div> : <h1>Submit</h1>}

            </button>
          </div>
          <div className='flex justify-center space-x-5'>
            <h1>Don't have an Account</h1>
            <button onClick={() => nav('/user/signUp')} className='text-blue-600 font-semibold'>Sign Up</button>
          </div>


        </div >


      </form >

    </div >
  )
}

export default Login

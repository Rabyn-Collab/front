import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useUserSignUpMutation } from '../../features/auth/authApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { addUser } from '../../features/auth/userSlice';


const SignUp = () => {


  const nav = useNavigate();
  const [userSignUp, { isError, isLoading, error }] = useUserSignUpMutation();


  const loginSchema = Yup.object().shape({
    username: Yup.string().min(5, 'Too short').max(20, 'Too Long').required('username is required'),
    email: Yup.string().required('email is required'),
    password: Yup.string().min(5, 'Too short').max(50, 'Too Long').required('password is required'),
  });


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: ''
    },
    onSubmit: async (val) => {
      try {
        const user = {
          email: val.email,
          password: val.password,
          username: val.username
        };
        const response = await userSignUp(user).unwrap();
        toast.success('successfully registered');
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
        <div className='w-[40%] mt-11 shadow-2xl bg-white p-4 space-y-4 '>

          <div className='flex justify-between'>
            <h1 className='text-2xl '>SignUp User</h1>

          </div>

          <div className='flex flex-col space-y-2'>
            <label htmlFor="username">Username</label>
            <input onChange={formik.handleChange} value={formik.values.username}
              className='border border-gray-500 outline-none px-2 py-1' type="text" id='username' name='username' placeholder='username' />
            {formik.errors.username && formik.touched.username ? <h1 className='text-pink-700'>{formik.errors.username}</h1> : ''}
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
            <h1>Already have an Account</h1>
            <button onClick={() => nav(-1)} className='text-blue-600 font-semibold'>Login</button>
          </div>


        </div >


      </form >

    </div >
  )
}

export default SignUp

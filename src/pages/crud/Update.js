import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { useUpdateBlogMutation } from '../../features/blog/blogApi';





const Update = () => {



  const [updatePost, { isError, isLoading }] = useUpdateBlogMutation();

  const { user } = useSelector((store) => store.user);

  const { state } = useLocation();

  const nav = useNavigate();




  const blogSchema = Yup.object().shape({
    title: Yup.string().min(10, 'Too short').max(200, 'Too Long').required('title is required'),
    detail: Yup.string().min(5, 'Too short').max(2000, 'Too Long').required('detail is required'),
  });


  const formik = useFormik({
    initialValues: {
      title: state === null ? '' : state.title,
      detail: state === null ? '' : state.detail,
      image: null,
      imageUrl: state === null ? '' : state.image
    },
    onSubmit: async (val) => {

      let formData = new FormData();
      formData.append('title', val.title);
      formData.append('detail', val.detail);
      formData.append('post_id', state._id);

      if (val.image == null) {
        try {
          const blogData = {
            blog: formData,
            token: user.token
          };
          const response = await updatePost(blogData).unwrap();
          toast.success('successfully Updated');
          nav(-1);
        } catch (err) {
          console.log(err);
          toast.error(err.data.message);

        }


      } else {

        formData.append('public_id', state.public_id);
        formData.append('image', val.image);
        try {
          const blogData = {
            blog: formData,
            token: user.token
          };
          const response = await updatePost(blogData).unwrap();
          toast.success('successfully updated');
          nav(-1);
        } catch (err) {
          toast.error(err.data.message);

        }



      }



    },
    validationSchema: blogSchema
  });





  return (
    <div>


      <form onSubmit={formik.handleSubmit} className='flex justify-center mt-3 items-center max-h-2xl '>
        <div className='w-[40%] shadow-2xl bg-white p-4 space-y-4 lg:w-[90%] xl:w-[90%]'>

          <div className='flex justify-between'>
            <h1 className='text-2xl '>Add Some Blog</h1>

          </div>

          <div className='flex flex-col space-y-2'>
            <label htmlFor="title">Title</label>
            <input onChange={formik.handleChange} value={formik.values.title}
              className='border border-gray-500 outline-none px-2 py-1' type="text" id='title' name='title' />
            {formik.errors.title && formik.touched.title ? <h1 className='text-pink-700'>{formik.errors.title}</h1> : ''}
          </div>

          <div className='flex flex-col space-y-2'>
            <label htmlFor="detail">Detail</label>
            <textarea
              className='border border-gray-500 outline-none px-2 py-1'
              onChange={formik.handleChange} value={formik.values.detail} name="detail" id="detail" cols="30" rows="5"></textarea>
            {formik.errors.detail && formik.touched.detail ? <h1 className='text-pink-700'>{formik.errors.detail}</h1> : ''}
          </div>


          {formik.values.imageUrl && <img className='h-14 w-14' src={formik.values.imageUrl} alt="" />}


          <div className='flex flex-col space-y-2'>
            <label htmlFor="image">'Change an image'</label>
            <input onChange={(e) => {

              const file = e.currentTarget.files[0];
              formik.setFieldValue('image', file);
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.addEventListener('load', () => {
                formik.setFieldValue('imageUrl', reader.result);
              })

            }} className='border border-gray-500 outline-none px-2 py-1' type="file" id='image' name='image' />
          </div>

          <div>


            <button className='bg-blue-500 p-2 w-[40%] rounded' type='submit'>

              {isLoading === true ? <div className='h-7 w-7 mx-auto rounded-full   border-2 border-black border-t-white animate-spin'>
              </div> : <h1>Submit</h1>}

            </button>
          </div>


        </div>


      </form>

    </div>
  )
}

export default Update




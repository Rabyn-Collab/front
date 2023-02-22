import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useGetBlogByUserQuery, useRemoveBlogMutation } from '../features/blog/blogApi';

const Profile = () => {

  const { user } = useSelector((store) => store.user);
  const nav = useNavigate();
  const { isError, isLoading, error, data } = useGetBlogByUserQuery(user.token);

  const [removePost, { isLoading: removeLoding }] = useRemoveBlogMutation();

  if (isLoading) {
    return <div className='h-[500px]'>
      <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_x62chJ.json" background="transparent" loop autoplay></lottie-player>
    </div>
  }

  const remove = async (post_id, public_id) => {
    try {
      const response = await removePost({
        post_id, public_id
      }).unwrap();
      toast.success('successfully remove');
    } catch (err) {
      toast.error(err.message);
    }
  }


  return (
    <div>

      <h1>{user.username}</h1>
      <p>{user.email}</p>

      <div className='grid grid-cols-4 p-5'>
        {data && data.posts.map((post) => {
          return <div key={post._id}>
            <img src={post.image} alt="" />
            <div className='mt-2 space-y-2'>
              <h1 className='text-2xl font-semibold'>{post.title}</h1>
              <p>{post.detail.substring(0, 100)}</p>
            </div>

            <div className='flex justify-end space-x-7'>
              <button onClick={() => {
                nav('/update/post', { state: post });
              }}>
                <i className="fa-regular fa-pen-to-square fa-xl"></i>

              </button>

              <button onClick={() => remove(post._id, post.public_id)}>
                <i className="fa-solid fa-trash fa-xl"></i>
              </button>
            </div>

          </div>
        })}
      </div>


    </div>
  )
}

export default Profile
import React from 'react'
import { useNavigate } from 'react-router';
import { useGetAllBlogsQuery } from '../features/blog/blogApi'

const Home = () => {
  const { isError, isLoading, error, data } = useGetAllBlogsQuery();
  const nav = useNavigate();

  if (isLoading) {
    return <div className='h-[500px]'>
      <lottie-player src="https://assets5.lottiefiles.com/packages/lf20_x62chJ.json" background="transparent" loop autoplay></lottie-player>
    </div>
  }



  return (
    <div className='grid grid-cols-3 p-5 gap-5'>
      {data && data.map((post) => {
        return <div className='hover: cursor-pointer' onClick={() => nav('postDetail', { state: post })} key={post._id}>
          <img className='h-[250px] w-full' src={post.image} alt="" />
          <div className='mt-2 space-y-2'>
            <h1 className='text-2xl font-semibold'>{post.title}</h1>
            <p>{post.detail.substring(0, 100)}</p>
          </div>

        </div>
      })}
    </div>
  )
}

export default Home

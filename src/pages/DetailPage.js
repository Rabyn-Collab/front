import React from 'react'
import { useLocation } from 'react-router'

const DetailPage = () => {


  const { state } = useLocation();

  return (
    <div>

      {state == null ? <h1 className='p-10 text-2xl text-pink-500'>No Data Were Found</h1> : <div className='p-7 space-y-7'>
        <h1 className='text-2xl font-semibold'>{state.title}</h1>
        <img className='w-[50%]' src={state.image} alt="" />
        <p>{state.detail}</p>
      </div>}



    </div>
  )
}

export default DetailPage
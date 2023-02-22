import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';





export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://blogs-some.onrender.com' }),
  tagTypes: ['Blogs'],
  endpoints: (builder) => ({

    getAllBlogs: builder.query({
      query: () => ({
        url: '/',
        method: 'GET'
      }),
      providesTags: ['Blogs']
    }),

    getBlogByUser: builder.query({
      query: (token) => ({
        url: '/api/userposts',
        method: 'GET',
        headers: {
          'Authorization': token
        }
      }),
      providesTags: ['Blogs']
    }),



    addBlog: builder.mutation({
      query: (val) => ({
        url: '/api/createPost',
        body: val.blog,
        method: 'POST',
        headers: {
          'Authorization': val.token
        }
      }),
      invalidatesTags: ['Blogs']
    }),

    updateBlog: builder.mutation({
      query: (val) => ({
        url: '/api/post/update',
        body: val.blog,
        method: 'PATCH',
        headers: {
          'Authorization': val.token
        }
      }),
      invalidatesTags: ['Blogs']
    }),


    removeBlog: builder.mutation({
      query: (val) => ({
        url: '/api/post/remove',
        body: val.blog,
        method: 'DELETE',
        headers: {
          'Authorization': val.token
        }
      }),
      invalidatesTags: ['Blogs']
    }),




  })
});



export const { useAddBlogMutation, useGetAllBlogsQuery, useRemoveBlogMutation,
  useUpdateBlogMutation,
  useGetBlogByUserQuery
} = blogApi;
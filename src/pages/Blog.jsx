import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosClient from '../axios';

function Blog() {

    const { slug } = useParams();

    const [blog, setBlog] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false)
    
    //loading component
    function Loading() {
        return (
            <h3>Loading...</h3>
        )
    }

    //error component
    function Err () {
        return (
            <h3>Something went wrong</h3>
        )
    }

    //loaded Component
    function Loaded() {
        return (
            isSuccess ? <BlogPage /> : <Err />
        )
    }

    //blog page component
    function BlogPage() {
        return (
            <>
                <h1>{blog.title}</h1>

                <p className="mt-2">
                    {blog.content}
                </p>

                <p className="mt-2">
                    Created at: {blog.createdAt}
                </p>
                <p>
                    Updated at: {blog.updatedAt}
                </p>
            </>
        )
    }

    useEffect(() => {
        async function getBlog() {
            try {
                const blog = (await axiosClient.get(`/blogs/byslug/${slug}`)).data.blog;
                setBlog(blog);
                setIsSuccess(true)
            } catch (error) {
                console.log(error);
                setIsSuccess(false)
            }
            finally{
                setIsLoading(false)
            }
        }

        getBlog()

    }, [slug])

    return (
        <div className="container my-2">
            {
                isLoading ? <Loading /> : <Loaded /> 
            }
        </div>
    )
}

export default Blog

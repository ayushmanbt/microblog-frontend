import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosClient from '../axios';


function BlogForm({blog}){
    const [title, setTitle] = useState(blog.title)
    const [slug, setSlug] = useState(blog.slug)
    const [content, setContent] = useState(blog.content)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [isFailure, setIsFailure] = useState(false)
    async function updateBlog(e) {
        e.preventDefault();
        setIsSubmitting(true);
        try {
           await axiosClient.post("/blogs/editbyid", {
                _id: blog._id,
                title,
                content,
                slug
            })
            setIsSuccess(true);
        } catch (error) {
            console.log(error);
            setIsSuccess(false);
            setIsFailure(true);
        }
        finally{
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={(e) => updateBlog(e)}>
            {
                isSuccess ? <div className="alert alert-success">Blog edit successful</div> : 
                <></>
            }
            {
                isFailure ? <div className="alert alert-danger">Slug or title match</div> : 
                <></>
            }
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="title"
                    value = {title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                        e.target.focus = true;
                    }}
                />
            </div>
            <div className="mb-3">
                    <label htmlFor="slug" className="form-label">Slug:</label>
                    <input type="text" className="form-control" id="slug"
                        onChange={(e) => {
                            setSlug(e.target.value); 
                        }}
                        value = {slug}
                    />
                    <div className="form-text">Please don't use space for slug</div>

                </div>
                <div className="mb-3">
                    <label htmlFor="content"  className="form-label">Content</label>
                    <textarea style={{height: '100px'}} className="form-control" id="content" onChange={(e) => {
                        setContent(e.target.value); 
                    }} value={content}/>
                    
                </div>
                {
                    isSubmitting ? <button type="submit" className="btn btn-success btn-lg w-100 btn-disabled">Submitting</button> : <button type="submit" className="btn btn-success btn-lg w-100">Submit</button>
                }
        </form>
    )

}



function EditBlog() {

    const {id} = useParams();

    


    const [isLoading, setIsLoading] = useState(true);
    const [isNotLoaded, setIsNotLoaded] = useState(true);
    const [blog, setBlog] = useState({});
    //get the blog and its elements
    useEffect(() => {
        setIsLoading(true)
        async function load(){
            try {
                let res = await axiosClient.get(`/blogs/byid/${id}`);
                let blog = res.data.blog;
                setBlog(blog);
                setIsNotLoaded(false)
            } catch (error) {
                console.log(error);
                setIsNotLoaded(true)
            }
            finally{
                setIsLoading(false)
            }
        }

        load();
    }, [id])

    

    function Loaded () {
        return isNotLoaded ? <div className="alert alert-danger">Blog not found</div>  : <BlogForm blog={blog} />
    }


    return(
        <div className="container mt-2">
            {isLoading ? 
                <h3>Loading...</h3>
                :
                <Loaded />
            }
        </div>
    )
}

export default EditBlog;
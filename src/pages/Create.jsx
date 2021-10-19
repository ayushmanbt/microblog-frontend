import React, { useState } from 'react'
import axiosClient from '../axios';

function Create() {
    
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    async function createNewBlog(e){
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axiosClient.post("/blogs/create", {
                title,
                content,
                slug
            })
            setTitle("");
            setContent("");
            setSlug("");
            setIsSuccess(true);
        } catch (error) {
            console.log(error)
        }finally{
            setIsSubmitting(false)
        }
    }

    return (
        <div className="container my-2">
            {
                isSuccess ? <div className="alert alert-success">Blog creation successful</div> : <></>
            }
            <h3>Create a new blog: </h3>
            <form onSubmit={createNewBlog}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input type="text" className="form-control" id="title"
                        onChange={(e) => {
                            setTitle(e.target.value); 
                        }}
                        value = {title}
                        required={true}
                    />

                </div>
                <div className="mb-3">
                    <label htmlFor="slug" className="form-label">Slug:</label>
                    <input type="text" className="form-control" id="slug"
                        onChange={(e) => {
                            setSlug(e.target.value); 
                        }}
                        value = {slug}
                        required={true}
                    />
                    <div className="form-text">Please don't use space for slug</div>

                </div>
                <div className="mb-3">
                    <label htmlFor="content"  className="form-label">Content</label>
                    <textarea style={{height: '100px'}} className="form-control" id="content" onChange={(e) => {
                        setContent(e.target.value); 
                    }} value={content}
                    required={true}
                    />
                    
                </div>
                {
                    isSubmitting ? <button type="submit" className="btn btn-success btn-lg w-100 btn-disabled">Submitting</button> : <button type="submit" className="btn btn-success btn-lg w-100">Submit</button>
                }
            </form>
        </div>
    )
}

export default Create;

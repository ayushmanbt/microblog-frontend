import React, { useEffect, useState } from 'react'
import axiosClient from '../axios';
import BlogTile from '../components/BlogTile';

function Loading() {
    return (
        <div>
            <p>Loading...</p>
        </div>
    )
}

function Blogs({blogs, loadMore, canLoadMore}){

    const [blogsList,setBlogsList] = useState(blogs)


    useEffect(() => {
        setBlogsList(blogs);
    }, [blogs])

    async function deleteBlog(id) {
        try {
            await axiosClient.post("/blogs/deletebyid", {
                _id: id
            });
            let updatedBlogs = blogsList.filter(e => e._id !== id);
            setBlogsList(updatedBlogs);
            alert("blog is deleted!");
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <div>
            {
                blogsList.map(blog => {
                return (<BlogTile blog={blog} key={blog._id} onDelete={() => deleteBlog(blog._id)}/>)
                })
            }
            {
                canLoadMore ? <button className="btn btn-outline-success w-100" onClick={() => loadMore()}>Load More...</button>: <></>
            }
            
        </div>
    )
}

function Loaded({isSuccessful, blogs, loadMore, canLoadMore}) {
    return (
        <div>
            {
                isSuccessful ? 
                    <Blogs blogs = {blogs} loadMore={loadMore} canLoadMore={canLoadMore}/> : 
                    <h3>Something went wrong!</h3> 
            }
        </div>
    )
}



function Home() {

    const [isLoading, setIsLoading] = useState(true)
    const [isSuccessful, setIsSuccessful] = useState(false)
    const [blogs, setBlogs] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const [canLoadMore, setCanLoadMore] = useState(true);

    async function loadMore () {
        if(currentPage + 1 < totalPages){
            try {
                const res = (await axiosClient.get(`/blogs/all/?page=${currentPage + 1}`)).data;
                const localBlogs = res.blogs;
    
                setTotalPages(res.totalPages)
                setCurrentPage(currentPage + 1)
                setBlogs([...blogs, ...localBlogs]);

                if(currentPage + 2 === totalPages){
                    setCanLoadMore(false);
                }
            } catch (error) {
                console.log(error);
                setIsLoading(false);
                setIsSuccessful(false);
            }
        }
        else{
            setCanLoadMore(false);
        }
    }

    useEffect(() => {
        async function fetchData(){
            try {
                const res = (await axiosClient.get("/blogs/all/")).data;
                const blogs = res.blogs;

                setTotalPages(res.totalPages)
                setIsLoading(false);
                setIsSuccessful(true);
                setBlogs(blogs);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
                setIsSuccessful(false);
            }
        }
        fetchData();
    }, [])

    return (
        <div className="container mt-2 mb-2">
            <h3 className="mb-2">Our blogs</h3>
            {
                isLoading ? 
                    <Loading /> : 
                    <Loaded isSuccessful={isSuccessful} blogs={blogs} loadMore={() => loadMore()} canLoadMore={canLoadMore} /> 
            }
        </div>
    )
}

export default Home

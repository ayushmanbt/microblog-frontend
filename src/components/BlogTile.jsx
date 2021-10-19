import moment from 'moment'
import React from 'react'
import {Link} from 'react-router-dom'


function BlogTile({blog, onDelete}) {
    
    
    return (
        
            <div className="card my-2 p-3">
                <h3 className="mb-2">{blog.title}</h3>
                <p className="m-0">{moment(blog.createdAt).format("DD/MM/YYYY - hh:mm")}</p>

                <div className="d-flex gap-2 mt-2">
                    <Link to={`/blog/${blog.slug}`} className="btn btn-primary">Read</Link>

                    <Link to={`/edit/${blog._id}`} className="btn btn-outline-success">Edit</Link>

                    <button className="btn btn-danger" onClick={() => onDelete()}>
                        Delete
                    </button>

                </div>
            </div>
    )
}

export default BlogTile

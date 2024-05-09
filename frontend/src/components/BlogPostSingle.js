import React, { useContext } from 'react'
import blogContext from '../context/notes/blogContext'

const BlogPostSingle = (props) => {
    const { blog, updateBlogPost } = props;
    const context = useContext(blogContext)
    const { deleteBlogPost } = context

    return (
        <div className="col-md-4 p-3">
            <div className="card">
                <div className="card-header d-flex">
                    <h5>{blog.author}'s Blog</h5>
                    <span className="ms-auto text-muted">{new Date(blog.date).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })}</span>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{blog.title}</h5>
                    <div className="card-text">{blog.content}</div>

                    <div style={{ float: "right", marginLeft: "1rem" }}>
                        <i className="fa fa-trash fa-2x text-danger" title="Delete" onClick={() => deleteBlogPost(blog._id)} style={{ marginRight: "10px" }}></i>
                        <i className="fa fa-edit fa-2x text-primary" title="Edit" onClick={() => updateBlogPost(blog)} ></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogPostSingle

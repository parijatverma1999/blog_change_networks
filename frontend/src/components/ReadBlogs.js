
import React, { useContext, useEffect, useRef, useState } from 'react'
import blogContext from '../context/notes/blogContext'
import BlogPostSingle from './BlogPostSingle'
import { Link, useNavigate } from 'react-router-dom'


const ReadBlogs = () => {
    const context = useContext(blogContext)
    const ref = useRef(null);
    const navigate = useNavigate()
    const { blogs, editBlogPost, fetchAllBlogs } = context

    const [blog, setBlog] = useState({
        id: "",
        update_title: "",
        update_content: "",
        update_author: ""
    })

    useEffect(() => {
        if (localStorage.getItem('authToken')) {
            fetchAllBlogs()
        } else {
            navigate("/login")
        }
    }, [])

    const updateBlogPost = (selected_blog) => {
        ref.current.click()
        setBlog({
            id: selected_blog._id,
            update_title: selected_blog.title,
            update_content: selected_blog.content,
            update_author: selected_blog.author
        })
    }

    const handleChange = (e) => {
        setBlog({
            ...blog,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        editBlogPost(blog.id, blog.update_title, blog.update_content, blog.update_author)

    }

    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    {/* <h3>Your Blog</h3> */}
                    {blogs.length == 0 && <div>Wish to create a Blog Post? <Link to="/">Click Here!</Link></div>}
                    {blogs.map((each_blog) => {
                        return <BlogPostSingle key={each_blog._id} updateBlogPost={updateBlogPost} blog={each_blog} />
                    })}
                </div>


            </div>

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Blog Post</h5>
                            {/* <button type="button" className="close">
                                <span aria-hidden="true">&times;</span>
                            </button> */}
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="form-group my-3">
                                    <label htmlFor="update_title">Title</label>
                                    <input type="text" className="form-control" name="update_title" id="update_title" placeholder="Enter Title" value={blog.update_title} onChange={handleChange} minLength={5} required />
                                </div>
                                <div className="form-group my-3">
                                    <label htmlFor="update_content">Content</label>
                                    <textarea type="text" className="form-control" name="update_content" id="update_content" placeholder="Enter Content" value={blog.update_content} onChange={handleChange} minLength={5} required />
                                </div>
                                <div className="form-group my-3">
                                    <label htmlFor="update_author">Author</label>
                                    <input type="text" className="form-control" name="update_author" id="update_author" placeholder="Enter Author" value={blog.update_author} onChange={handleChange} minLength={5} required />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleUpdateSubmit}>Update Post</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ReadBlogs;
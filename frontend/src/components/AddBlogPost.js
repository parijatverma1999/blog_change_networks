import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import blogContext from '../context/notes/blogContext'

const AddBlogPost = () => {
    const navigate = useNavigate()
    const context = useContext(blogContext)
    const { addBlogPost } = context
    const [blog, setBlog] = useState({
        title: "",
        content: "",
        author: ""
    })

    const handleChange = (e) => {
        setBlog({
            ...blog,
            [e.target.name]: e.target.value
        })
    }

    const handleCreate = (e) => {
        e.preventDefault();
        addBlogPost(blog.title, blog.content, blog.author)
        navigate('/read_blogs')

    }
    return (
        <div className='container'>
            <h4 className='my-3'>Create a Blog post</h4>
            <form className='my-3'>
                <div className="form-group my-3">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" name="title" id="title" placeholder="Enter Title" onChange={handleChange} minLength={5} required />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" className="form-control" name="content" id="content" placeholder="Enter Content" rows="6" cols="50" onChange={handleChange} minLength={5} required />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="author">Author</label>
                    <input type="text" className="form-control" name="author" id="author" placeholder="Enter Author" onChange={handleChange} minLength={5} required />
                </div>
                <button type="submit" disabled={blog.title.length < 3 || blog.content.length < 5 || blog.author.length < 3} className="btn btn-primary" style={{ float: "right" }} onClick={handleCreate}>Create</button>
            </form>
        </div>
    )
}

export default AddBlogPost
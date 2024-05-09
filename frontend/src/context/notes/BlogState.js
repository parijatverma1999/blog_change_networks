import React, { useState } from 'react'
import blogContext from './blogContext'


const BlogState = (props) => {
  const [blogs, setBlogs] = useState([])

  //CREATE
  const addBlogPost = async (title, content, author) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/blogs/createBlogPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('authToken')
      },
      body: JSON.stringify({ title, content, author })
    });

    if(response.status === 200){
      setBlogs(blogs.concat({ title, content, author }))
      // alert("Blog Post Added Successfully")
    }
    else{
      alert(response.statusText)
    }
  }

  //READ
  const fetchAllBlogs = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/blogs/fetchAllBlogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('authToken')
      },
    });

    const result = await response.json();
    setBlogs(result)
  }

  //UPDATE
  const editBlogPost = async (id, title, content, author) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/blogs/updateBlogPost/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('authToken')
      },
      body: JSON.stringify({ title, content, author })
    });

    if(response.status === 200){
      let newBlogs = JSON.parse(JSON.stringify(blogs))
      for (let index = 0; index < newBlogs.length; index++) {
        const elem = newBlogs[index];
        if (elem._id === id) {
          newBlogs[index].title = title;
          newBlogs[index].content = content;
          newBlogs[index].author = author;
        }
      }
      setBlogs(newBlogs)
      alert("Blog Post Updated Successfully")
    }
    else{
      alert(response.statusText)
    } 
  }

  //DELETE
  const deleteBlogPost = async (id) => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/blogs/deleteBlogPost/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('authToken')
      }
    });

    if (response.status === 200) {
      const newBlogPost = blogs.filter((elem) => { return elem._id !== id })
      setBlogs(newBlogPost)
      alert("Post Deleted Successfully")
    }
    else{
      alert(response.statusText)
    }
  }

  return (
    <blogContext.Provider value={{ blogs, addBlogPost, fetchAllBlogs, editBlogPost, deleteBlogPost }}>
      {props.children}
    </blogContext.Provider>
  )
}

export default BlogState
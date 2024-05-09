import React, {useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'

import AddBlogPost from './AddBlogPost'

const Home = (props) => {
    const {showAlert} = props
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('authToken')) {
            navigate("/login")
        }
    }, [])
    return (
        <>
           <AddBlogPost showAlert={showAlert} />
        </>

    )
}

export default Home
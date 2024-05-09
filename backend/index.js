const express = require('express')
const app = express();
require('dotenv').config();
const cors = require('cors')
const connectToMongo = require('./db')
const authFile = require('./routes/auth') 
const blogsFile = require('./routes/blogs') 

connectToMongo();

app.get('/', (req, res) => {
    res.send("Hello world")
})
app.use(express.json())
app.use(cors())


app.use('/api/auth', authFile)
app.use('/api/blogs', blogsFile)

app.listen(process.env.PORT, () => {
    console.log(`Blog Post App listening on http:localhost:${process.env.PORT}`)
})


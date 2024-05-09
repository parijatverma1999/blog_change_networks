const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/blog_change_networks";


const connectToMongo = () => {
    mongoose.connect(mongoURI, 
        {useNewUrlParser: true})
        .then(() => console.log("Connected to MongoDB Successfully"))
        .catch(error => {
            console.log(error);
        });

}

module.exports = connectToMongo;
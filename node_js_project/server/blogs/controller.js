const blog = require('./blog')

const createBlog = (req, res) => {
    if( req.file && req.body.title.length > 0 && req.body.category !== ""
        && req.body.description.length > 0){
            res.redirect('/new?error=1')    
        }
    else{
        res.redirect('/new?error=2')
    }
}

module.exports  = {createBlog}
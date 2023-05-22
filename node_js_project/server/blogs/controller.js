const blog = require('./blog')
const user = require('../auth/user')
const fs = require('fs')
const path = require('path')

const createBlog = async(req, res) => {
    if( req.file && req.body.title.length > 0 && req.body.category !== ""
        && req.body.description.length > 0){
            await new blog({
                title: req.body.title,
                category: req.body.category,
                image: `/images/blogs/${req.file.filename}`,
                description: req.body.description,
                author: req.user._id,
            }).save()
            res.redirect(`/profile/${req.user._id}`)
        }
    else{
        res.redirect('/new?error=2')
    }
}

const editBlog = async(req, res) => {
    if(req.file && req.body.title.length > 0 && req.body.category !== ""
    && req.body.description.length > 0){
        const Blog = await blog.findById(req.body.id)
        try{
            fs.unlinkSync(path.join(__dirname + '../../../public' + Blog.image))
        }catch(e){  
        }
        Blog.title = req.body.title
        Blog.category = req.body.category
        Blog.image = `/images/blogs/${req.file.filename}`
        Blog.description = req.body.description
        Blog.author = req.user._id
        Blog.save()
        res.redirect(`/profile/${req.user._id}`)
    }else{
        res.redirect(`/edit/${req.body.id}?error=2`)
    }
}

const deleteBlog = async(req, res) => {
    const Blog = await blog.findById(req.params.id)
    if(Blog){
        fs.unlinkSync(path.join(__dirname + '../../../public' + Blog.image))
        await Blog.deleteOne({_id: req.params.id})
        res.status(200).send('ok')
    }else{
        res.status(404).send('Not found')
    }
}

const saveBlog = async(req, res) => {
    if(req.user && req.body.id){
        const User = await user.findById(req.user.id)
        const findBlog = User.toRead.filter(item => item._id == req.body.id)
        if(findBlog.length == 0){
           User.toRead.push(req.body.id)
           User.save()
           res.send('Блог успешно сохранен')
        }else{
           res.send('Блог уже сохранен')
        }
     }
}

const deleteFromToRead = async(req, res) => {
    if(req.user && req.params.id){
        const User = await user.findById(req.user.id)
        for(let i = 0; i < User.toRead.length; i++){
            if(User.toRead[i] == req.params.id){
                User.toRead.splice(i, 1)
                User.save()
                res.send('Успешно удалено')
            }
        }
    }
}

module.exports  = {createBlog, editBlog, deleteBlog, saveBlog, deleteFromToRead}
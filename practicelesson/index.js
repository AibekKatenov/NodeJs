const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/todo').then(() => console.log('Connected to mongoDB'))
    .catch((e) => console.log('Failed to connect'))


app.use(express.urlencoded())
app.use(express.static(__dirname + '/public'));
const ToDoSchema = new mongoose.Schema({
    title: String,
    price: String,
    discount: String,
    link: String,
})

const ToDo = mongoose.model("practice", ToDoSchema)

app.post('/productadder', async (req,res) => {
    await new ToDo({
        title: req.body.title,
        price: req.body.price,
        discount: req.body.discount,
        link: req.body.link,
    }).save()
    res.redirect('/')
})

app.set("view engine", "ejs")

app.get('/', async(req, res) => {    
    const data = await ToDo.find()
    res.render("welcome", {data})
})

app.get('/editer/:id', async(req, res) => {
    const EditData = await ToDo.findById(req.params.id)
    res.render("editer", {EditData})
})

app.post('/editer', async(req,res) => {
    await ToDo.findByIdAndUpdate(req.body.id,{
        title: req.body.title,
        price: req.body.price,
        discount: req.body.discount,
        link: req.body.link,
    })
    res.redirect('/')
})

app.get('/productadder', (req, res) => {
    res.render("productadder")
})
app.delete('/delete/:id', async(req,res) => {
    await ToDo.findByIdAndDelete({_id: req.params.id})
    res.status(200).send('OK')
})
    

const PORT = 8000
app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
})






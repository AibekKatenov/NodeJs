const express = require('express')
const app = express()

let count = 0
app.set("view engine", "ejs")
app.use(express.json())

// app.use((req, res ,next) => {
//     if(!req.headers["content-type"] && !req.headers["content-type"].match(/json/)){
//         return next()
//     }
//         let data = ""
//         try{
//         req.on("data", chunk => {
//             data += chunk
//         })
//         req.on("end", () => {
//             req.body = data ? JSON.parse(data) : 1
//             next()  
//         })}
//     catch(e){
//         console.log(e)
//     }
// } )

app.post('/count',(req, res) => {
    count += req.body.value
    res.json({count})
})



app.get('/',(req,res) => {
    res.render('index', {count})
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Listening PORT ${PORT}`)
})
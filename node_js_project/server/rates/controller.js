const Rate = require('./rates')

const saveRate = async(req, res) => {
    if(req.body.authorId && req.body.blogId && req.body.rate){
        await new Rate({
            rate: req.body.rate,
            text: req.body.text,
            authorId: req.body.authorId,
            blogId: req.body.blogId,
            date: Date.now()
    }).save()
    res.status(200).send(true)
    }
}

const deleteRate = async(req, res) => {
    const comment = await Rate.findById(req.params.id)
    if(comment){
        await Rate.deleteOne({_id: req.params.id})
        res.status(200).send('ok')
    }else{
        res.status(404).send('Not found')
    }
}

module.exports = {
    saveRate, deleteRate
}
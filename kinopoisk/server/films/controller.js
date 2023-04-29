const film = require('./film')

const createFilm = (req, res) => {
    if(req.file && req.body.titlerus.length > 2 && req.body.titleeng.length > 2
        && req.body.year > 0
        && req.body.time > 2
        && req.body.country.length > 2 && req.body.genre.length > 2){
            new film({
                titleRus: req.body.titlerus,
                titleEng: req.body.titleeng,
                year: req.body.year,
                time: req.body.time,
                country: req.body.country,
                genre: req.body.genre,
                image: `${req.file.destination}/${req.file.filename}`,
                author: req.user._id,
            }).save()
            res.redirect(`/admin/${req.user._id}`)
    }else{
        res.redirect('/new?error=1')
    }
}

module.exports = {createFilm}
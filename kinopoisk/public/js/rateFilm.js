const stars = document.querySelectorAll('.comment-stars>img')
function rateFilm(rate){
    for(let i = 0; i < stars.length; i++){
        stars[i].classList.remove ('active-star')
    }
    for(let i = 0; i < rate; i++){
        stars[i].classList.add('active-star')
    }
}

function sendRate(e){
    e.preventDefault()
    
}
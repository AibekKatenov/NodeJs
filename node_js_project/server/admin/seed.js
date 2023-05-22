const user = require('../auth/user')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');


async function createAdmin(){
    const findAdmin = await user.findOne({isAdmin: true}).count()
    if(!findAdmin){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash('1', salt, function(err, hash) {
                new user({
                        full_name: 'admin',
                        email: 'admin@mail.ru',
                        password: hash,
                        isAdmin: true,
                    }).save()
                })
            })
    }
}

module.exports = createAdmin
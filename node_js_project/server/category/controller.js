const category = require('./category')

const getAllCategories = async(req, res) => {
    const data = await category.find();
    res.status(200).send({data})
}

module.exports = getAllCategories
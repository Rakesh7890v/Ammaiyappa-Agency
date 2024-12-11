const mongoose = require('mongoose')

const FoodSchema = new mongoose.Schema({
    name: String,
    price: String,
    qnt: String,
    image: String,
    type: String
})

const FoodModel = mongoose.model("Foods",FoodSchema)
module.exports = FoodModel
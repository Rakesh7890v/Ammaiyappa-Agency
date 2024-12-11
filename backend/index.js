const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const FoodModel = require('./models/Foods');

const app = express();
const port = 5000;
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true
}))

app.use(bodyParser.json({limit : '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());

mongoose.connect("mongodb+srv://rakeshrishi098:Rakesh.v109@sabari.fcdhg.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error", err));

app.get('/', (req,res) => {
    res.json("Hello");
})

app.post('/addfoods', async(req, res) => {
    const foodData = {
        name: req.body.name,
        price: req.body.price,
        qnt: req.body.qnt,
        image: req.body.image,
        type: req.body.type,
    };
    console.log("FOOD:", foodData);
    await FoodModel.create(foodData)
    .then(food => res.status(200).json(food))
    .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while adding the food' });
    });
});

app.get('/foods', (req, res) => {
    FoodModel.find({})
        .then(foods => res.json(foods))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while fetching foods' });
        });
});


app.post('/delete', (req, res) => {
    const {id} = req.body;
    FoodModel.findByIdAndDelete(id)
    .then(() => res.send("Sucess"))
    .catch(err => console.log(err));
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
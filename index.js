const express = require('express');
const app = express();
const path = require('path');
const port = 3000
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const Auto = require('./models/auto')

main().then(() => console.log('Connected to Mongo'))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/forzaAutosApp');
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    res.redirect('/cars');
})

app.get('/cars', async (req, res) => {
    const autos = await Auto.find({});
    res.render('cars/index', { autos });
})

app.get('/cars/new', (req, res) => {
    res.render('cars/new')
})

app.post('/cars', async (req, res) => {
    const newAuto = new Auto(req.body);
    await newAuto.save();
    console.log(newAuto)
    res.redirect(`/cars/${newAuto._id}`)
})

app.get('/cars/:id', async (req, res) => {
    const { id } = req.params;
    const car = await Auto.findById(id)
    res.render('cars/show', { car })
})

app.get('/cars/:id/edit', async (req, res) => {
    const { id } = req.params;
    const car = await Auto.findById(id)
    res.render('cars/edit', { car })
})

app.put('/cars/:id', async (req, res) => {
    const { id } = req.params;
    const car = await Auto.findByIdAndUpdate(id, req.body, { runValidators: true, returnDocument: 'after' });
    res.redirect(`/cars/${car._id}`)
})

app.delete('/cars/:id', async (req, res) => {
    const { id } = req.params;
    const deletedAuto = await Auto.findByIdAndDelete(id);
    res.redirect('/cars')
})

app.listen(port, () => {
    console.log(`App running in port: ${port}`)
})
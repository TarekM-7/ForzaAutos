const express = require('express');
const app = express();
const path = require('path');
const port = 3000
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate')
const catchAsync = require('./utils/catchAsync')
const ExpressError = require('./utils/ExpressError')
const methodOverride = require('method-override')

const Auto = require('./models/auto')

main().then(() => console.log('Connected to Mongo'))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/forzaAutosApp');
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.engine('ejs', ejsMate);
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

app.post('/cars', catchAsync(async (req, res) => {
    if(!req.body.Auto) throw new ExpressError('Invalid Car Data', 400);
    const newAuto = new Auto(req.body);
    await newAuto.save();
    console.log(newAuto)
    res.redirect(`/cars/${newAuto._id}`)
}));

app.get('/cars/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const car = await Auto.findById(id)
    res.render('cars/show', { car })
}));

app.get('/cars/:id/edit', catchAsync(async (req, res) => {
    const { id } = req.params;
    const car = await Auto.findById(id)
    res.render('cars/edit', { car })
}));

app.put('/cars/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const car = await Auto.findByIdAndUpdate(id, req.body, { runValidators: true, returnDocument: 'after' });
    res.redirect(`/cars/${car._id}`)
}));

app.delete('/cars/:id', catchAsync(async (req, res) => {
    const { id } = req.params;
    const deletedAuto = await Auto.findByIdAndDelete(id);
    res.redirect('/cars')
}));

app.all('/{*path}', (req, res, next) => {
    next(new ExpressError('Page not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message='Something went wrong' } = err;
    res.status(statusCode).send(message);
})

app.listen(port, () => {
    console.log(`App running in port: ${port}`)
})
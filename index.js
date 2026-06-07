const express = require('express');
const app = express();
const path = require('path');
const port = 3000
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const Joi = require('joi');
const { autoSchema } = require('./schemas')
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');

const Auto = require('./models/auto')

main().then(() => console.log('Connected to Mongo'))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/forzaAutosApp');
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.engine('ejs', ejsMate);
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

const validateAuto = (req, res, next) => {
    const { error } = autoSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400);
    } else {
        next()
    }
}

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

app.post('/cars', validateAuto, catchAsync(async (req, res) => {
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

app.put('/cars/:id', validateAuto, catchAsync(async (req, res) => {
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
    const { statusCode = 500 } = err;
    if(!err.message) err.message = 'Oh no, something went wrong!';
    res.status(statusCode).render('error', { err })
})

app.listen(port, () => {
    console.log(`App running in port: ${port}`)
})
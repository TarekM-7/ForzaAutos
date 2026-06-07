# 🚗 Forza Autos

A full-stack car dealership web app inspired by **Forza Horizon 6**. Browse, add, edit, and delete cars from the game, each with their real price in **Credits (CR)** and **Performance Index class**, with data validation, error handling, and a clean Bootstrap UI.

## Technologies

- `Node.js` & `Express` — server and routing
- `MongoDB` & `Mongoose` — database and data modeling
- `EJS` & `ejs-mate` — templating and layouts
- `Bootstrap 5` — responsive UI and styling
- `Joi` — server-side data validation
- `method-override` — support for PUT and DELETE from HTML forms

## Features

What you can do with Forza Autos:

- 🚘 Browse all cars in a responsive card-based layout
- ➕ Add new cars with a validated form
- ✏️ Edit existing car details
- 🗑️ Delete cars from the dealership
- 💰 Prices displayed in CR (Credits) format, automatically formatted
- 🏁 Performance Index (PI) stored numerically, with class letter computed automatically
- ⚠️ Server-side validation with Joi and friendly error pages
- 🔒 Custom error handling for invalid routes and server errors

## The Process

This project was built alongside **The Web Developer Bootcamp 2026** by Colt Steele, where I learned the process and structure of building a full-stack web app and then applied it to something I wanted to build myself.

I started by setting up the Express server and connecting it to MongoDB with Mongoose, then created a seed script to populate the database with real Forza Horizon 6 cars sourced from the official FH6 website to around 20 cars, each with their name, brand, country, price in CR, Performance Index, and image URL.

From there I built out the full CRUD routes (index, show, new, edit, update, and delete) one by one, making sure each worked before moving on.

Once the core functionality was working, I added EJS templates and integrated `ejs-mate` to avoid repeating the HTML boilerplate across every view. I then brought in Bootstrap 5 via CDN to style the UI, using cards for the car listings and a clean form layout for adding and editing cars.

With the UI in place, I focused on robustness, adding server-side validation with Joi, a reusable `validateAuto` middleware applied to both the POST and PUT routes, a custom `ExpressError` class, a `catchAsync` utility to handle async errors cleanly, and a catch-all route for undefined paths.

Throughout the entire process the project was managed with Git, committing changes regularly and pushing to GitHub.

## What I Learned

### 🗄️ MongoDB & Mongoose

How to connect to a local MongoDB database, define schemas with types, validators (`required`, `min`, `max`), and create, read, update, and delete documents using Mongoose methods like `find()`, `findById()`, `findByIdAndUpdate()`, and `findByIdAndDelete()`.

### 🌱 Database Seeding

How to write a `seeds.js` script to wipe and repopulate the database with `deleteMany()` and `insertMany()`, and why closing the Mongoose connection at the end of a seed script is important.

### 🛣️ Express Routing

How Express matches routes in order, why route order matters (e.g. `/cars/new` must come before `/cars/:id`), and how to use `method-override` to send PUT and DELETE requests from HTML forms.

### 🎨 EJS & ejs-mate

How to render dynamic content with EJS, and how to use `ejs-mate` to define a single boilerplate layout shared across all views and avoiding repetition of the HTML structure.

### ✅ Server-side Validation with Joi

How to define a validation schema with Joi, extract it into a separate `schemas.js` file, and use it inside a reusable `validateAuto` middleware applied to multiple routes.

### 🚨 Error Handling

How to create a custom `ExpressError` class that extends the built-in `Error`, a `catchAsync` utility wrapper to avoid repeating `try/catch` in every async route, and a global error-handling middleware to render a friendly error page.

### 🎨 Bootstrap 5

How to build a responsive card layout using Bootstrap's grid system (`col-lg-4 col-sm-6 col-12`), use `h-100` and `object-fit: cover` to make cards uniform in height, and build clean forms with Bootstrap's form components.

### 🗂️ Project Structure

How to organize a full-stack Node.js project into separate folders and files by responsibility and keeping the codebase clean and easy to navigate:

- **models/** — Mongoose schemas and models
- **seeds/** — database seed script and data
- **utils/** — reusable utilities like `catchAsync` and `ExpressError`
- **views/** — EJS templates organized by resource (`cars/`), plus shared `layouts/` and `partials/`
- **schemas.js** — Joi validation schemas kept separate from the routes
- **index.js** — main entry point for the server

### 🔀 Git Workflow

How to initialize a Git repository, create a `.gitignore` to exclude `node_modules`, commit changes regularly, and push to GitHub, also including how to remove accidentally tracked files with `git rm -r --cached`.

## How can it be improved?

- Add user authentication so each user manages their own garage
- Add image upload support instead of relying on image URLs
- Add search and filtering by car class, brand, or country
- Paginate the car listing for large collections
- Connect to a live Forza API or community database for real car data
- Deploy to a cloud platform with MongoDB Atlas
- Compute the car class letter (D, C, B, A, S1, S2, X) automatically from the Performance Index using a Mongoose virtual, instead of storing it manually

## 🏃 Running the Project

Make sure you have **Node.js** and **MongoDB** installed and running locally.

1. Clone the repository:

   ```
   git clone https://github.com/TarekM-7/ForzaAutos.git
   ```

2. Navigate to the project folder:

   ```
   cd ForzaAutos
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Seed the database:

   ```
   node seeds/index.js
   ```

5. Start the server:

   ```
   node index.js
   ```

6. Open your browser and go to:
   ```
   http://localhost:3000
   ```

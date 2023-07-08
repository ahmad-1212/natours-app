const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('../../models/tourModel');
const Review = require('../../models/reviewModel');
const User = require('../../models/userModel');

dotenv.config({ path: './config.env' });

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

const DB = process.env.LOCAL_DATABASE;

const connectDB = async function () {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
    });
    console.log('DB connection successfull');
  } catch (err) {
    console.log(err);
  }
};

connectDB();

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`));

const importData = async () => {
  try {
    // await Tour.create(tours);
    // await Review.create(reviews);
    await User.create(users, { validateBeforeSave: false });
    console.log('Data successfully Added');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    // await Tour.deleteMany();
    // await Review.deleteMany();
    await User.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);

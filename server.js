const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });

// if in case some uncaught error occurs and it is not handled
process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

const port = process.env.PORT || 3000;
let server;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successfull!');
    server = app.listen(port, () => {
      console.log(`App running on port ${port}...`);
    });
  });

// If in case some promise is rejected and it is not handled
process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully!');
  server.close(() => {
    console.log('Process terminated');
  });
});

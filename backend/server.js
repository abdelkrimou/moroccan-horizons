const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 SHUTTING DOWN...');
  console.log(err.name, '--', err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');
const port = process.env.PORT || 3000;

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATA_BASE_PASS
);

mongoose
  .connect(DB)
  .then(() => console.log('DB connected successfully!'))
  .catch((err) => console.error('MongoDb connection error', err));

const server = app.listen(8000, () => {
  console.log(`App running on Port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, '-- ', err.message);
  console.log('UNHANDLED REJECTION! 💥 SHUTTING DOWN...');
  server.close(() => {
    process.exit(1);
  });
});

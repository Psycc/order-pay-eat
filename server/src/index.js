import 'dotenv/config';
import 'babel-polyfill';
import express from 'express';
import mongoose from 'mongoose';

import subscribers from './routes/subscribers';

mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true,
});
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

const app = express();

app.use(express.json());

app.use('/subscribers', subscribers);

app.listen(3000, () => console.log('Server listening on port 3000'));

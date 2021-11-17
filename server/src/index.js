import 'dotenv/config';
import 'babel-polyfill';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import auth from './routes/auth';

const port = process.env.PORT;
const whitelist = [
	'http://localhost:8080',
	'http://localhost',
	'https://localhost',
];
const corsOptions = {
	credentials: true,
	origin: (origin, callback) => {
		if (!origin || whitelist.indexOf(origin) !== -1) return callback(null, true);
		return callback(new Error('Not allowed by CORS'));
	},
};

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

mongoose.connect(process.env.DB_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use('/auth', auth);

app.listen(port, () => console.log('Server listening on port '+ port));

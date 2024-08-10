import express, { Express, Request, Response } from 'express';
import 'dotenv/config'; // remember
import cors from 'cors';
import axios from 'axios';
import mongoose, { Schema } from 'mongoose';
import { strict } from 'assert';

const app: Express = express();
const port = process.env.PORT || 5000;

const DATABASE_URL = process.env.DATABASE_URL;

DATABASE_URL && mongoose.connect(
    DATABASE_URL
).then(
    () => console.log(`[server] : Database Found`)
).catch(err => console.log(err))

const db = mongoose.connection;
db.on('error', err => console.error(err));
db.once('open', () => console.log(`[server] : Connected to database`));

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    // console.log(`Request processed at ${process.pid}`);
    res.send('Express + TypeScript Server');
});

app.get('/ip', async (req: Request, res: Response) => {
    const { data } = await axios.get('https://curlmyip.org/');
    console.log('[server] IP : ', data);
    res.json({ ip: data });
});

app.get('/data', async (req: Request, res: Response) => {
    try {
        const collection = db.collection('listingsAndReview');
        // const model = mongoose.model('listingsAndReview', new Schema());
        const data = collection.find();
        // const data = await model.find().lean();
        console.log(JSON.stringify(data));
        res.status(200).json({data});
    }
    catch(err: any) {
        console.error(err);
        res.status(500).json({error: "Something went wrong!"});
    }
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

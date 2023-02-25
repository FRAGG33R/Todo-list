import { PrismaClient } from '@prisma/client'
import express from 'express' 
const prisma = new PrismaClient();
import bodyParser from 'body-parser'
const app = express();
import cors from 'cors';

app.use(bodyParser.json());

var corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.get('/', (req, res) => {
	res.send("hello from server")
})

app.post('/app', async (req, res) => {
	console.log(req.body);
	res.status(200).send("hello from the server!");
});


app.listen(3001);

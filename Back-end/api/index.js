import { PrismaClient } from '@prisma/client'
import express from 'express' 
const prisma = new PrismaClient();
import bodyParser from 'body-parser'
const app = express();

app.use(bodyParser.json());

app.post('/app', (req, res) => {
	console.log(req.body);
	res.status(200);
})
app.get('/', (req, res) => {

})

app.listen(300);

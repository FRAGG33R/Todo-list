import { PrismaClient } from '@prisma/client'
import express from 'express' 
const prisma = new PrismaClient();
import bodyParser from 'body-parser'
const app = express();

app.use(bodyParser.json());

app.post('/', async (req, res) => {
	console.log(req.body);
	const user = await prisma.user.create(
		{
			data :{
				name : req.body.name,
				email: req.body.email
			}
		}
	)
	res.status(200);
})
app.get('/', (req, res) => {

})

app.listen(3000);

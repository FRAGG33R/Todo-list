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

const userExists = async (email) => {
	const posts = await prisma.user.findMany({
		where: { email },
	})
	return posts.length >= 1;
};

app.get('/', (req, res) => {

})

app.post('/', async (req, res) => {
	const user = await prisma.user.findUnique({
		where: { email : req.body.email},
	});
	const newTodo = await prisma.todo.create({
		data: {
			name: req.body.name,
			User: { connect: { id: user.id } },
		},
	});
	res.send(newTodo.name);
});

app.post('/app', async (req, res) => {
	if (!(await userExists(req.body.email)))
	{
		const user = await prisma.user.create(
			{
				data : {
					email: req.body.email, 
					name : req.body.nickName,
				}
			}
		)
	}
	res.status(200)
});

app.listen(3001);

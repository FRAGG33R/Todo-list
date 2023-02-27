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

const todoExists = async (name) => {
	const posts = await prisma.todo.findMany({
		where: { name },
	})
	return posts.length >= 1;
};

app.post('/app/todos',  async (req, res) => {
	const user = await prisma.user.findUnique({
		where: { email : req.body.email},
	});
	const Todos = await prisma.todo.findMany({
		where: {
			userId : user.id
		},
	});
	res.status(200).send(Todos);
})

app.post('/', async (req, res) => {
	const user = await prisma.user.findUnique({
		where: { email : req.body.email},
	});
	if (!(await todoExists(req.body.name)))
	{
		const newTodo = await prisma.todo.create({
			data: {
				name: req.body.name,
				User: { connect: { id: user.id } },
			},
		});
		res.send(newTodo.name);
	}
	else
		res.send(null);
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

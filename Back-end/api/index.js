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
	console.log(posts.length, email);
	return posts.length >= 1;
};

const todoExists = async (user, name) => {
	const posts = await prisma.todo.findMany({
		where: {
			name,
			userId : user.id
		},

	})
	return posts.length >= 1;
};

app.post('/app/todos',  async (req, res) => {
	const user = await prisma.user.findUnique({
		where: { email : req.body.email},
	});
	if (user)
	{
		const Todos = await prisma.todo.findMany({
			where: {
				userId : user.id
			},
		});
		res.status(200).send(Todos);
	}
	else
		res.send(null);

})

app.post('/', async (req, res) => {
	const user = await prisma.user.findUnique({
		where: { email : req.body.email},
	});
	if (!(await todoExists(user, req.body.name)))
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
	console.log("user email", req.body.email);
	console.log("user name", req.body.name);
	const existingUser = await prisma.user.findUnique({
		where: { email: req.body.email }
	  });
	if (!existingUser)
	{
		const user = await prisma.user.create (
			{
				data : {
					email: req.body.email,
					name : req.body.name,
				}
			}
		)
		console.log("the user added successfuly" , user);
	}
});

app.listen(3001);

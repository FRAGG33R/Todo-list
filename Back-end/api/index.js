import { PrismaClient } from '@prisma/client'
import express from 'express' 
const prisma = new PrismaClient();
import bodyParser from 'body-parser'
const app = express();
import cors from 'cors';
import { Console } from 'console';

app.use(bodyParser.json());

var corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

app.get('/app/list', (req, res) => {
	console.log(req)
	console.log("this is the querry that I need !")
	console.log(req.query);
	res.status(200).send("Hello from the server !");
})

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

app.delete('/app', async (req, res) => {
	try
	{
		const  deletedTodo = await prisma.todo.delete({
			where: {
			  id: req.body.id,
			},
		  })
		res.status(200).send("the todo list removed successfuly")
	}
	catch(err)
	{
		console.log("error has been occurred", err);
	}
})

app.post('/', async (req, res) => {
	try
	{
		const user = await prisma.user.findUnique({
			where: { email : req.body.email},
		});
		const newTodo = await prisma.todo.create({
			data: {
				name: req.body.name,
				User: { connect: { id: user.id } },
			},
		});
		res.send({name : newTodo.name, id : newTodo.id});
	}
	catch(err)
	{
		console.log("error has been occurred", err);
	}
});

app.post('/app', async (req, res) => {
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
	}
});

app.listen(3001);

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

app.post('/app/list', async (req, res) => {
	const taskContent = req.body.inputValue;
	const todoId = req.body.id;
	console.log(`content : ${taskContent}, id : ${todoId}`)
	if (taskContent.length > 0 && todoId)
	{
		try {
			const task = await prisma.task.create({
				data: {
					content : taskContent,
					todo: { connect: { id: parseInt(todoId) } },
				},
			});
			console.log(task);
			res.status(200).send("successfully");
		}
		catch (error) {
			console.log("error number 1");
			res.status(400).send("failed");
		}
	}
	console.log("I should do nothing !")
	res.status(404).send("Something missed !");
  });

app.get('/app/list', async (req, res) => {
	const Id = req.query.id;
	console.log(`id : ${Id}`);
	if (Id > 0)
	{
		try {
			const todo = await prisma.todo.findUnique({
				where : {id : Id},
			})
			if (todo)
			{
				console.log(todo);
				res.status(200).send(todo.tasks);
			}
			else
			{
				console.log("error number 2")
				res.status(200).send(null);
			}
		}
		catch (error) {
			console.log("error number 3")
			console.log(error);
		}
	}
})

app.post('/app/todos',  async (req, res) => {
	try {
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
			if (Todos)
				res.status(200).send(Todos);
			else
				res.status(200).send("Empty todo list");
		}
		else
			res.status(200).send("User not found");

	}
	catch (error) {
		console.log("crash");
	}
	
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
		res.status(400).send(null);
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
				user: { connect: { id: user.id } },
			},
		});
		res.send({name : newTodo.name, id : newTodo.id});
	}
	catch(err)
	{
		res.status(400).send(null);
		console.log("error has been occurred", err);
	}
});

app.post('/app', async (req, res) => {
	try {
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
		res.status(200).send("successfully");
	}
	catch (error) {
		res.status(400).send(null)
	}
	
});

app.listen(3001);

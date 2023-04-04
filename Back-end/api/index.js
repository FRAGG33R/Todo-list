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

// app.post('/todos/:todoId/tasks', async (req, res) => {
// 	const { todoId } = req.params;
// 	const { content } = req.body;
  
// 	const task = await prisma.task.create({
// 	  data: {
// 		content,
// 		todo: { connect: { id: parseInt(todoId) } },
// 	  },
// 	});
  
// 	res.json(task);
//   });

app.get('/app/list', async (req, res) => {
	const Id = req.query.id;
	if (Id > 0)
	{
		try {
			const todo = await prisma.todo.findUnique({
				where : {id : Id},
			})
			if (todo)
			{
				// console.log(todo.tasks);
				console.log(todo);
				res.status(200).send(todo.tasks);
			}
			else
			{
				res.send(null);
			}
		}
		catch (error) {
			console.log(error);
		}
	}
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
				user: { connect: { id: user.id } },
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

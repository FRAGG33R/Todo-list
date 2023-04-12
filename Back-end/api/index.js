import { PrismaClient } from "@prisma/client";
import express from "express";
const prisma = new PrismaClient();
import bodyParser from "body-parser";
const app = express();
import cors from "cors";

app.use(bodyParser.json());

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
var checkedTask = [];

app.use(cors(corsOptions));

app.get("/app/checkedTask", (req, res) => {
	res.status(200).send(checkedTask);
})

app.post("/app/checkedTask", (req, res) => {
	checkedTask = req.body.checkedTask;
	res.status(200).send("successfuly data set");
})

app.delete("/app/list",  async (req, res) => {
	const Id = req.body.id;
	try {
		const deletedTask = await prisma.task.delete({
			where: { id: Id },
		})
		const newRecord = await prisma.task.findMany();
		res.status(200).send(newRecord);
	}
	catch (error) {
		console.log("Could not remove task number ", Id)
	}
})

app.post("/app/list", async (req, res) => {
  const taskContent = req.body.inputValue;
  const todoId = req.body.id;
  if (taskContent.length > 0 && todoId) {
    try {
      const task = await prisma.task.create({
        data: {
          content: taskContent,
          todo: { connect: { id: parseInt(todoId) } },
        },
      });
      res.status(200).send(task);
    } catch (error) {
      res.status(400).send("failed");
    }
  } else res.status(404).send("Something missed !");
});

app.get("/app/list", async (req, res) => {
  const Id = parseInt(req.query.id);
  if (Id > 0) {
    try {
      const tasks = await prisma.task.findMany({
        where: { todoId: Id },
      });
      res.status(200).send(tasks);
    } catch (error) {
      console.log(error);
    }
  }
});

app.post("/app/todos", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (user)
	{
      const Todos = await prisma.todo.findMany({
        where: {
          userId: user.id,
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
});

app.delete("/app", async (req, res) => {
  try {
		// console.log("id : ", req.body.id);
		const deletedTasks = await prisma.task.deleteMany({
			where: { todoId: req.body.id },
		});
		const deletedTodo = await prisma.todo.delete({
		where: {
			id: req.body.id,
		},
		});
		res.status(200).send("the todo list and it's tasks are removed successfuly");
  	}
	catch (err) {
		console.log("error has been occurred", err);
    	res.status(400).send(null);
  }
});

app.post("/", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    const newTodo = await prisma.todo.create({
      data: {
        name: req.body.name,
        user: { connect: { id: user.id } },
      },
    });
    res.send({ name: newTodo.name, id: newTodo.id });
  } catch (err) {
    res.status(400).send(null);
    console.log("error has been occurred", err);
  }
});

app.post("/app", async (req, res) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: req.body.email },
    });
    if (!existingUser) {
      const user = await prisma.user.create({
        data: {
          email: req.body.email,
          name: req.body.name,
        },
      });
    }
    res.status(200).send("successfully");
  } catch (error) {
    res.status(400).send(null);
  }
});

app.listen(3001);

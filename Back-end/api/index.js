import { PrismaClient } from '@prisma/client'
const express = require('express');
const prisma = new PrismaClient();
const app = express();

app.post('/', (req, res) => {
	const text = req.body;
	res.send('successfuly');
})

app.listen(3000);

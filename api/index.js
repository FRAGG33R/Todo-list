import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const user = await prisma.user.findFirst({
	where : {
		id : 1,
	},
})
console.log("The username is : ", user.name);
console.log("The email is : ", user.email);
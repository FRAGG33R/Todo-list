import { PrismaClient } from "@prisma/client";
import express from "express";
const prisma = new PrismaClient();
import bodyParser from "body-parser";
const app = express();
import cors from "cors";
import Router from './Routes.js'


app.use(bodyParser.json());

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};


app.use(cors(corsOptions));

app.use(Router);

app.listen(3001);

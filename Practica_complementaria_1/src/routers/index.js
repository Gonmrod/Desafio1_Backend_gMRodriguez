import { Router } from "express";
import studentRouter from "./students.js";

const indexRouter = Router()

//Tengo que configurar las rutas
indexRouter.use('/students', studentRouter);

export default indexRouter;
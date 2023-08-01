import { Router } from "express";
import Student from "../models/student.js";

const studentRouter = Router();

//armemos un CRUD
//Create
studentRouter.post('/', async(req, res, next)=>{
    try{
        let one = await Student.create(req.body)
        return res.status(201).json({
            success: true,
            message: `student id: ${one._id}`
        })
    } catch(error){
        next(error)
    }
})

//Read

studentRouter.get('/', async(req, res, next)=>{
    try{

    } catch(error){
        next(error)
    }
})

//Update

studentRouter.put('/:id', async(req, res, next)=>{
    try{

    } catch(error){
        next(error)
    }
})

//Delete

studentRouter.delete('/:id', async(req, res, next)=>{
    try{

    } catch(error){
        next(error)
    }
})

export default studentRouter;
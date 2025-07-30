import express from 'express';
import jwt from "jsonwebtoken";
import multer from "multer";

import userService from '../service/userService.js';
import authHandler from '../middleware/authMiddleware.js';

const fileUpload = multer({dest: '../files/'})

const userRouter = express.Router()

userRouter
    .get('/', authHandler([10]), async (req, res) => {
        let [result, stat] = await userService.getAll()
        res.status(stat).json(result)
    })
// .put('/', authHandler([10]), async (req, res) => {
//     let updatedUser = req.body
//     updatedUser.id = jwt.decode(req.cookies['jwToken']).id
//     let [result, stat] = await userService.update(updatedUser)
//     res.status(stat).json(result)
// });

userRouter
    .get('/id', authHandler([10]), async (req, res) => {
        let [result, stat] = await userService.getById(jwt.decode(req.cookies['jwToken']).id);
        res.status(stat).json(result)
    })
    .put('/id', authHandler([10]), async (req, res) => {
        let updatedUserData = req.body
        updatedUserData.id = jwt.decode(req.cookies['jwToken']).id
        let [result, stat] = await userService.update(updatedUserData)
        res.status(stat).json(result)
    });

userRouter
    .get('/:id', authHandler([10]), async (req, res) => {
        let [result, stat] = await userService.getById(req.params.id);
        res.status(stat).json(result)
    })
    .put('/:id', authHandler([11]), async (req, res) => {
        let updatedUser = req.body
        updatedUser.id = req.params.id
        let [result, stat] = await userService.update(updatedUser)
        res.status(stat).json(result)
    })
    .delete('/:id', authHandler([11]), async (req, res) => {
        let [result, stat] = await userService.getAll()
        res.status(stat).json(result)
    });

userRouter
    .post('/photo', fileUpload.single('photo'), async (req, res) => {
        console.log(req.file)
    })

export default userRouter;
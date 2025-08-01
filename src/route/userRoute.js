import express from 'express';
import jwt from "jsonwebtoken";

import userService from '../service/userService.ts';
import authHandler from '../middleware/authMiddleware.js';
import photoMiddleware from "../middleware/photoMiddleware.js";
import userRepo from "../repo/userRepo.ts";

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


///TODO: refactor this to handle error and make more modular; prob just move into it's own router
userRouter
    .get('/photo/:photoPath', async (req, res) => {
        let photoPath = req.params.photoPath.replaceAll("-", "/");
        console.log(photoPath)
        res.status(200).sendFile(photoPath, {root: '.'})
    })
    .post('/photo', ///TODO: also delete the current photo of the user if it's in the 1 (dynamic) folder
        authHandler([10]),
        photoMiddleware.single('photo'),
        async (req, res) => {
            console.log(req.file)
            await userRepo.update({id: jwt.decode(req.cookies['jwToken']).id, photo: req.file.path.replaceAll('\\', '-')})
            res.status(200).json({message: 'File uploaded successfully'})
        }
    )
    .post('/photo/:id',
        photoMiddleware.single('photo'),
        authHandler([11]),
        async (req, res) => {
            await userRepo.update({id: req.params.id, photo: req.file.path.replaceAll('\\', '-')})
            res.status(200).json({message: 'File uploaded successfully'})
        }
    )

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
        updatedUser.id = req.paramsN.id
        let [result, stat] = await userService.update(updatedUser)
        res.status(stat).json(result)
    })
    .delete('/:id', authHandler([11]), async (req, res) => {
        let [result, stat] = await userService.getAll()
        res.status(stat).json(result)
    });

export default userRouter;
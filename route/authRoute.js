import express from 'express';
import validationHandler from "../middleware/validationMiddleware.js";
import credService from '../service/credService.js';
import credSchema from "../schema/credSchema.js";

const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
    let [result, stat] = await credService.authenticate(req.body);
    res.cookie('jwToken', result.token)
    res.status(stat).json(result)
});
authRouter.post('/signup', validationHandler(credSchema), async (req, res) => {
    let [result, stat] = await credService.insert(req.body);
    res.status(stat).json(result)
});
authRouter.get('/logout', async (req, res) => {
    res.clearCookie('jwToken');
    res.status(200).json({message: 'success'});
})
export default authRouter;
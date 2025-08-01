import passwordUtil from "../util/passwordUtil";
import jwt from "jsonwebtoken";
import authorityRepo from "../repo/authorityRepo";
import userRepo from "../repo/userRepo";
import credRepo from "../repo/credRepo";
import Credentials from "../model/Credentials";


const credService = {
    async authenticate(givenCred: Credentials): Promise<[any, number]> {
        let output: [any, number] = [{message: 'An unexpected error has occurred'}, 400]
        let knownCred: any = {};

        await credRepo.getByEmailAndPassword(
            givenCred.email,
            passwordUtil.hashPassword(givenCred.password)
        )
            .then(results => knownCred = results[0][0])
            .catch((err) => [err, 400])
        if(knownCred?.password === undefined) return [{message: 'Incorrect email or password'}, 400]

        delete knownCred.password // we don't want to have the password in the token; even if it's hashed
        knownCred.permissions =
            (await authorityRepo.getUserPermissions(knownCred.id))[0]
                .map((x: any): number => x.id)

        let token = jwt.sign(knownCred, 'secret');
        return [{message: 'success', token: token}, 200]
    },
    async insert(newUserCred: Credentials): Promise<[any, number]> {
        let output: [any, number] = [{message: 'default'}, 400]
        newUserCred.password = passwordUtil.hashPassword(newUserCred.password)
        newUserCred.role = 1 //TODO: replace with a better way of inserting defaults
        await credRepo.insert(newUserCred)
            .then( _ => output = [{message: 'Cred inserted successfully'}, 200]
            )
            .catch((err: Error): any => output = [{message: err.message}, 400])
        await userRepo.insert(
            {email: newUserCred.email, name: newUserCred.email.split('@', 1)[0]}
        )
            .then( _ => output = [{message: 'User inserted successfully'}, 200]
            )
            .catch((err: Error): any => output = [{message: err.message}, 400])

        return output
    },

}

export default credService;
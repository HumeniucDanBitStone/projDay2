import passwordUtil from "../util/passwordUtil.js";
import jwt from "jsonwebtoken";
import entityRepo from "../repo/entityRepo.js";
import authorityRepo from "../repo/authorityRepo.js";

const credService = {
    credRepo: new entityRepo('credentials'),
    userRepo: new entityRepo('users'),
    async authenticate(givenCred) {
        let output = [{message: 'An unexpected error has occurred'}, 400]
        let knownCred = {};

        await this.credRepo.get([
            ['email', givenCred.email],
            ['password', passwordUtil.hashPassword(givenCred.password)]
        ])
            .then(results => knownCred = results[0][0]
                // if two or more creds are found IDK
            )
            .catch((err) => [err, 400])
        if(knownCred?.password === undefined) return [{message: 'Incorrect email or password'}, 400]

        delete knownCred.password // we don't want to have the password in the token; even if it's hashed
        knownCred.permissions =
            (await authorityRepo.getUserPermissions(knownCred.id))[0]
                .map(x => x.id)

        let token = jwt.sign(knownCred, 'secret');
        return [{message: 'success', token: token}, 200]
    },
    async insert(newUserCred) {
        let output = [{message: 'default'}, 400]
        newUserCred.password = passwordUtil.hashPassword(newUserCred.password)
        newUserCred.role = 1 //TODO: replace with a better way of inserting defaults
        await this.credRepo.insert(newUserCred, ['email', 'role', 'password'])
            .then( () => output = ['Cred inserted successfully', 200]
            )
            .catch((err) => output = [err.message, 400])
        await this.userRepo.insert(
            {email: newUserCred.email, name: newUserCred.email.split('@', 1)[0]},
            ['email', 'name']
        )
            .then( () => output = ['User inserted successfully', 200]
            )
            .catch((err) => output = [err.message, 400])

        return output
    },

}

export default credService;
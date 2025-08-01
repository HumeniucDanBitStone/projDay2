import entityRepo from "./entityRepo";
import Credentials from "../model/Credentials"

let credRepo = {
    repo: new entityRepo('credentials'),
    async getByEmailAndPassword(email: string, password: string): Promise<[any, Credentials[]]> {
        return await this.repo.get([
            ['email', email],
            ['password', password]
        ])
    },
    async insert(newCred: Credentials): Promise<[any, any]> {
        return await this.repo.insert(newCred, ['email', 'password', 'role'])
    }
}

export default credRepo
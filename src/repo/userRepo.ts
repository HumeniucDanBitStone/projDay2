// import dbConn from "./dbConn";
import User from "../model/User";
import entityRepo from "./entityRepo";
import {FieldPacket} from "mysql2";

let userRepo = {
    /// TODO: refactor both cred and user repos to make use of the `entityRepo`
    ///     rn: services use the object repo directly
    repo: new entityRepo('users'),
    async getAll(): Promise<[User[], any]> {
        return await this.repo.get([]);
    },
    async getById(id: number): Promise<[User[], any]> {
        return await this.repo.get([['id', id]])
    },
    async insert(newUser: User): Promise<[any, FieldPacket[]]> {
        return await this.repo.insert(newUser, ['email', 'name', 'photo'])
    },
    /**
     * @param updatedUser NEEDS to contain the correct id in a field named `id`
     */
    async update(updatedUser: User) {
        return await this.repo.update(updatedUser);
    },
    async delete(id: number) {
        await this.repo.delete(id);
    }
}

export default userRepo
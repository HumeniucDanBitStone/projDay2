import dbConn from "./dbConn.js";
import entityRepo from "./entityRepo.js";

let userRepo = {
    /// TODO: refactor both cred and user repos to make use of the `entityRepo`
    ///     rn: services use the object repo directly
    repo: new entityRepo('users'),
    async getAll(){
        return this.repo.get([]);
    },
    async getById(id) {
        return this.repo.get([['id', id]])
    },
    async insert(newUser) {
        return dbConn.promise().query(
            'insert into ' + this.tableName + ' (name, email) values(?, ?)',
            [newUser.name, newUser.email]
        );
    },
    /**
     * @param updatedUser NEEDS to contain the correct id in a field named `id`
     */
    async update(updatedUser) {
        return await this.repo.update(updatedUser);
    },
    async delete(id) {
        await this.repo.delete(id);
    }
}

export default userRepo
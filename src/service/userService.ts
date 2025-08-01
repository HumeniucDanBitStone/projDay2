import userRepo from "../repo/userRepo";
import User from "../model/User";

const userService = {
    async getAll(): Promise<[any, number]> {
        let output: [any, number] = [{message: 'Unknown error'}, 400]
        await userRepo.getAll()
            .then(results => output = [results[0], 200])
            .catch((err) => [err, 400])
        return output
    },
    async getById(id: number): Promise<[any, number]> {
        let output: [any, number] = [{message: 'Unknown error'}, 400]
        await userRepo.getById(id)
            .then(results => {
                    output = results[0].length === 1 ? // check if a SINGLE user has been found
                        [results[0][0], 200] :
                        [{message: 'Could not find such user'}, 404]
                }
            )
            .catch((err) => output = [{message: err}, 400])
        return output
    },
    async update(updatedUser: User) {
        let output = [{message: 'Unknown error'}, 400]
        await userRepo.update(updatedUser)
            .then(_ => output = [{message: 'User updated successfully'}, 200])
            .catch((err) => [err, 400])
        return output
    },
    async delete(id: number) {
        let output: [any, number] = [{message: 'Unknown error'}, 400]
        await userRepo.delete(id)
            .then(_ => output = [{message: 'User deleted successfully'}, 200])
            .catch((err) => [{message: err}, 400])
        return output
    }
}

export default userService
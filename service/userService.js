import userRepo from "../repo/userRepo.js";

const userService = {
    async getAll() {
        let output = [{}, 400]
        await userRepo.getAll()
            .then(results => output = [results[0], 200])
            .catch((err) => [err, 400])
        return output
    },
    async getById(id) {
        let output = [{}, 400]
        await userRepo.getById(id)
            .then(results =>
                    output = results[0].length === 1 ? // check if a SINGLE user has been found
                    [results[0][0], 200] :
                    [{message: 'Could not find such user'}, 404]
                    // if two or more users are found IDK
            )
            .catch((err) => [err, 400])
        return output
    },
    async update(updatedUser) {
        let output = [{}, 400]
        await userRepo.update(updatedUser)
            .then( _ => output = [{message: 'User updated successfully'}, 200])
            .catch((err) => [err, 400])
        return output
    },
    async delete(id) {
        let output = [{}, 400]
        await userRepo.delete(id)
            .then( _ => output = ['User deleted successfully', 200])
            .catch((err) => [err, 400])
        return output
    }
}

export default userService
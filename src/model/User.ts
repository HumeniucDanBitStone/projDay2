// TODO: make `id` and `photo` be REQUIRED and assign the necessary values in `userRepo`
type User = {
    id?: number
    name: string
    email: string
    photo?: string
}

export default User;
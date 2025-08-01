import * as crypto from "node:crypto";

//TODO: add slat and other params here and either instantiate manually or make a factory
const passwordUtil = {
    hashPassword(password: string) {
        return crypto.createHash("sha512").update(password).digest("hex");
    },
    isPasswordsEquals(unhashedPassword: string, hashedPassword: string) {
        return this.hashPassword(unhashedPassword) === hashedPassword;
    }
}

export default passwordUtil
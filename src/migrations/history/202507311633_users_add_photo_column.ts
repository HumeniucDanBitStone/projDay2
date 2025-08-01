import dbConn from "../../repo/dbConn.js";
import DbMigration from "../logic/DbMigration.js";

const migration: DbMigration = {
    async up() {
        await dbConn.promise().query(
            `
                ALTER TABLE users
                    ADD COLUMN photo VARCHAR(64);
            `
        )
        return dbConn.promise().query(
            `
                UPDATE users
                SET photo = CONCAT(CONCAT('files-0-', FLOOR(RAND() * 6) + 1), '.png')
                where 1 = 1;
            `
        )
    },
    async down() {
        return dbConn.promise().query(
            `
                ALTER TABLE users
                DROP COLUMN photo;
            `
        )
    }
}

export default migration

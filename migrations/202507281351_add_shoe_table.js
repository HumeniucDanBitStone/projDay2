import dbConn from "../repo/dbConn.js";

const migration = {
    up() {
        return dbConn.promise().query(
            `
                create table shoes
                (
                    id    bigint auto_increment
                        primary key,
                    brand varchar(255) not null,
                    model varchar(255) not null
                )
            `
        )
    },
    down() {
        return dbConn.promise().query(
            `
                drop table shoes
            `
        )
    }
}

export default migration

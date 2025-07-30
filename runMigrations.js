import fs from 'fs'
import dbConn from "./repo/dbConn.js";

let folderLocation = './migrations'

function getUnexecutedMigrations(allMigrations, executedMigrations) {
    let unexecutedMigrations = []
    let i1 = 0, i2 = 0
    while (i1 < allMigrations.length) {
        if (allMigrations[i1] === executedMigrations[i2]) i2++
        else unexecutedMigrations.push(allMigrations[i1])
        i1++
    }
    return unexecutedMigrations
}

async function executeMigrations(migrationFileNames){
    for(let fileName of migrationFileNames){
        let query = fs.readFileSync(folderLocation + '/' + fileName).toString();
        // await dbConn.promise().query(query)
        await require(`./migrations/${fileName}`).up();
        await dbConn.promise().query(
            'insert into migrations(name) values(?)',
            fileName
        )
    }
}

async function initMigrationsTable(){
    await dbConn.promise().query(
        `
            create table if not exists migrations
            (
                id   bigint auto_increment primary key,
                name varchar(255) not null
            );
        `
    )
}

async function runMigrations() {
    await initMigrationsTable()

    let executedMigrations = (
        await dbConn.promise().query(
            'select * from migrations order by name'
        )
    )[0].map(x => x?.name)
    let allMigrations = fs.readdirSync('./migrations');
    allMigrations = allMigrations.filter(x =>
        x.split('.').pop() === 'js'
    )
    let unexecutedMigrations = getUnexecutedMigrations(allMigrations, executedMigrations)
    await executeMigrations(unexecutedMigrations)
}

export default runMigrations

import fs from 'fs'
import dbConn from "../../repo/dbConn";

let folderLocation = './migrations/history';
let modulesLocation = '../history';



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
        // let query = fs.readFileSync(folderLocation + '/' + fileName).toString();
        // await dbConn.promise().query(query)
        let curMigration = (await import(`${modulesLocation}/${fileName}`))
        console.log(curMigration)
        curMigration.default.up();
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
    let curPath = fs.Dir
    let allMigrations = fs.readdirSync(folderLocation);
    allMigrations = allMigrations.filter(x => x.endsWith('.js') || x.endsWith('ts')
    )
    let unexecutedMigrations = getUnexecutedMigrations(allMigrations, executedMigrations)
    await executeMigrations(unexecutedMigrations)
}

export default runMigrations

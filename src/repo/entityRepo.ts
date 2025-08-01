import dbConn from "./dbConn";
import {FieldPacket} from "mysql2";

class entityRepo{
    private tableName: string;
    constructor(tableName:string) {
        this.tableName = tableName;
    }

    async get(filters: any[][]): Promise<any> {
        let queryString = 'SELECT * FROM  ' + this.tableName
        if(filters.length >= 1)
            queryString +=
                ' where ' + filters[0][0] + ' = ? ' +
                filters.slice(1).map((item) => 'and ' + item[0] + ' = ? ')
        console.log(queryString)
        let values = filters.map(x => x[1])
        console.log(values)
        return dbConn.promise().query(
            queryString,
            values
        );
    }
    async insert(elem:any, columns: string[]): Promise<[any, FieldPacket[]]> {
        let queryString = 'insert into ' + this.tableName +
                      '(' + columns.join(',') + ')' +
                      'values (?' + ', ?'.repeat(columns.length - 1) + ')'
        console.log(queryString)
        let values = columns.map(x => elem[x])
        return dbConn.promise().query(
            queryString,
            values
        );
    }
    async update(elem: any) {
        let fields = Object.getOwnPropertyNames(elem).filter(x => x !== 'id');
        // let fields = Object.getOwnPropertyNames(elem);
        // fields = fields.splice(fields.indexOf('id'), 1)
        let queryString = `UPDATE  ${this.tableName} set `
        queryString += fields.map(x => `${x} = ?`).join(',')
        queryString += ` where id = ${elem.id}`
        console.log(queryString)
        let values = fields.map(x => elem[x])
        console.log(values)
        return dbConn.promise().query(
            queryString,
            values
        );
    }
    async delete(id: number) {
        let queryString = `DELETE FROM  ${this.tableName} WHERE id = ?`
        console.log(queryString)
        return dbConn.promise().query(
            queryString,
            id
        );
    }
}

export default entityRepo
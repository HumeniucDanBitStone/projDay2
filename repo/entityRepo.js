import dbConn from "./dbConn.js";

class entityRepo{
    constructor(tableName) {
        this.tableName = tableName;
    }
    async get(filters) {
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
    async insert(elem, columns) {
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
    async update(elem) {
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
        )
    }
    async delete(id) {
        let queryString = `DELETE FROM  ${this.tableName} WHERE id = ?`
        console.log(queryString)
        return dbConn.promise().delete(
            queryString,
            id
        );
    }
}

export default entityRepo
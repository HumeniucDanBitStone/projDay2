import dbConn from './dbConn'
import {FieldPacket} from "mysql2";

let authorityRepo = {
    async getUserPermissions(id:number): Promise<[any, FieldPacket[]]> {
        return dbConn.promise().query(
            'SELECT p.id FROM permissions p JOIN roles_permissions rp ' +
            'ON p.id = rp.permission_id JOIN credentials u ' +
            'ON rp.role_id = u.role ' +
            'WHERE u.id = ?;',
            [id]
        )
    }
}

export default authorityRepo;
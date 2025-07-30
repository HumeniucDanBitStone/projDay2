import dbConn from './dbConn.js'

let authorityRepo = {
    async getUserPermissions(id) {
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
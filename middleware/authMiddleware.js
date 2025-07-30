import jwt from 'jsonwebtoken'

const authHandler = (requiredPermissions) => {
    return (req, res, next) => {
        try {
            if (req.cookies?.['jwToken'] === undefined || !jwt.verify(req.cookies?.['jwToken'], 'secret')) {
                res.status(401).send('Unauthenticated')
                return
            }
            let authData = jwt.decode(req.cookies?.['jwToken'], 'secret');
            if (!requiredPermissions.map(x => authData.permissions.includes(x)).reduce((a, b) => a && b)) {
                res.status(403).send('Not permitted')
                return
            }
            return next()
        }
        catch(err) {
            res.clearCookie('jwToken');
            res.status(403).send('Not permitted')
        }
    }
}

export default authHandler

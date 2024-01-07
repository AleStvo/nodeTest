exports.checkUser = ({req, res, next}, ext) => {
    const {login: checkLogin, password} = req?.body || {};
    const {users} = ext;

    const user = users.find(({login}) => checkLogin === login);

    if (user && user.passwordHash === password) {
        return next();
    }

    return res.sendStatus(401);
}
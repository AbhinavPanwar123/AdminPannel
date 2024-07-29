const JWT = require('jsonwebtoken');

const generateToken = (userId) => {
    return JWT.sign(
        {userId},
        "mysecretkey",
        {expiresIn:'4d'}
    )
};

module.exports = generateToken;
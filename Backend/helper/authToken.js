const JWT = require('jsonwebtoken');

const generateToken = (sellerId) => {
    return JWT.sign(
        {sellerId},
        "mysecretkey",
        {expiresIn:'4d'}
    )
};

module.exports = generateToken;
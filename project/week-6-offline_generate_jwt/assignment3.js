const jwt = require("jsonwebtoken")
const jwtpassword = "secrete"

function verifyJwt(token) {
    let ans = null
    try {
        const verified = jwt.verify(token, jwtpassword) // if this does not through exseption then function simply return true
        // if (verified) {
        //     return true   
        } catch(e) {
            return false
        }
        return ans
    }
 
console.log(verifyJwt("8ujhjksgjjsh"))


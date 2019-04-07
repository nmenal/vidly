function authentication(req,res,next) {
    console.log('authentication..');
    next();    
}
module.exports = authentication;
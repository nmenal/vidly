module.exports.admin = function(req,res,next){
        //403 Forbiden
        if(!req.user.isAdmin) return res.status(403).send('Access denied !');
        next();
}
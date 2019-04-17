module.exports = function (err, req, res, next) {
    //Logging
    res.status(500).send(err.message);
}
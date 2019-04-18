module.exports = function (app) {
    //setting templating config and engin
    app.set('view engine', 'pug');// sets the default view engine
    app.set('views', './views');
}

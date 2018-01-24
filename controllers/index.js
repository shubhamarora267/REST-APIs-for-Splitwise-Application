module.exports = function(app) {
    app.use('/api/auth/', require('../controllers/auth'));
    app.use('/api/friends/', require('../controllers/friends'));
    //app.use('/api/users/', require('../controllers/users'));
}

var restify = require('restify');
var errors = require('restify-errors');
var plugins = require('restify').plugins;
new errors.InternalError;
var mongoose = require('mongoose');

mongoose.connect(process.env.DB, {useMongoClient: true});
mongoose.Promise = global.Promise;

console.log('process.env.PORT',JSON.stringify(process.env.PORT, '\t', 4));
console.log('process.env.DB',JSON.stringify(process.env.DB, '\t', 4));

var Cat = mongoose.model('Cat', {name: String});

var options = {
    name: 'cats', // http header 'Server:'
    acceptable: ['application/json']
};

function saveRespond(req, res, next) {
    console.log('req.params=', JSON.stringify(req.params, '\t', 4));
    var kitty = new Cat(req.params);
    kitty.save(function (err, data) {
        console.log('inside=', JSON.stringify(err, '\t', 4), JSON.stringify(data, '\t', 4));
        if (err) {
            console.log(err);
            return next(new errors.BadRequestError());
        }
        res.send(data);
        next();
    });
}

function getRespond(req, res, next) {
    Cat.findById(req.params.id, function (err, cat) {
        if (err) {
            console.log(err);
            return next(new errors.BadRequestError());
        }
        if (cat) {
            res.send(data);
            return next();
        } else {
            return next(new errors.ResourceNotFound());
        }
    })
}

var server = restify.createServer(options);

server.use([
    plugins.acceptParser(server.acceptable),
    plugins.queryParser(),
    plugins.jsonBodyParser({mapParams: true})
]);
server.get('/ping', function (req, res, next) {
    console.log('ping:%s', JSON.stringify( { port: process.env.PORT, db: process.env.DB }) );
    res.send( { port: process.env.PORT, env: process.env.ENV }) ;
    return next();
});
server.post('/cat', saveRespond);
server.get('/cat/:id', getRespond);

server.listen(process.env.PORT || 3000, function () {
    console.log('%s listening at %s', server.name, server.url);
});
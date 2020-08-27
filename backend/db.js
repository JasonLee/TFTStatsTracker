const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/tft";

const dbName = 'tft';

var db;
MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, function(err, client) {
            if (err) throw err;
            console.log("Database connected!");
            db = client.db(dbName);
});

exports.test = (callback) => {
    db.collection('matches').find().toArray((err, result) => {
        callback(err, result);
    });

}


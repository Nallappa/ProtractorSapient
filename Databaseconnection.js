
var sql = require('mssql');

describe('test db connection', function () {

    it('tests db connection', function () {

        ConnectDB()

    })

function ConnectDB() {
    return new Promise(function (fulfill, reject) {
        var config = {
            user: 'user',
            .............
    };
        var connection = new sql.Connection(config);
        connection.connect(function (err) {
            reject(err);
        });

        var request = new sql.Request(connection);
        request.query('select * from Config where [Key] like \'HidePreop%\'', function (err, recordeset) {
            if (err) reject(err);
            else fulfill(recordeset);
        });
    });
}
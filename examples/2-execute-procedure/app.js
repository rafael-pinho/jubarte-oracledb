const jubarte = require('../../lib/index.js'),
      oracledb = require('oracledb');

jubarte.initialize
    .setOracleDefaults({
        outBinds: oracledb.OBJECT
    })
    .addConnectionPool({
        user: process.env.ORACLE_USER, 
        password: process.env.ORACLE_PASSWORD, 
        connectString: process.env.ORACLE_CONNECTION_STRING 
    });

const express = require('express'),
    app = express();

app.get('/countries', function (req, res) {
    let statement = jubarte.statement.create('COUNTRIES.ALL');
        statement.addParameters()
            .name('CURSOR').direction(oracledb.OUT_BIND)
            .name('NAME').value(req.query.name)
        .fetchProcedure()
        .then((data) => {
            res.status(200).send(data[0]);
        })
        .finally(() => {
            statement.done();
        })
        .catch((err) => {
            res.status(500).send(err.toString());
        })
});

app.post('/countries', function (req, res) {
    let statement = jubarte.statement.create();

    statement
        .sql('COUNTRIES.INSERT')
        .addParameters()
            .name('ID').direction(oracledb.OUT_BIND)
            .name('NAME').value(req.body.name)
        .executeProcedure()
        .then((data) => {
            res.status(200).send(data[0]);
        })
        .finally(() => {
            statement.done();
        })
        .catch((err) => {
            res.status(500).send(err.toString());
        })
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
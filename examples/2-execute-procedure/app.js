const express = require('express'),
      app = express(),
      databaseConfiguration = require('./configuration.js'),
      jubarte = require('jubarte-oracledb');

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

databaseConfiguration((err) => {
    if(!err){
        app.listen(3000, function () {
            console.log('Example app listening on port 3000!');
        });
    }
    else
        throw err;
});

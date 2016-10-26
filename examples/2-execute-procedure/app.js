const express = require('express'),
      app = express(),
      databaseConfiguration = require('./configuration.js'),
      jubarte = require('jubarte-oracledb');

app.get('/countries', function (req, res) {
    let statement = jubarte.statement.create('COUNTRIES.ALL');
        statement.addParameters()
            .name('CURSOR').direction(jubarte.oracledb.OUT_BIND).type(jubarte.oracledb.CURSOR)
            .name('NAME').value(req.query.name)
        .fetchProcedure()
        .then((results) => {
            res.status(200).send(results[0]);
        })
        .finally(() => {
            statement.done();
        })
        .catch((err) => {
            res.status(500).send({
                code: 500,
                message: err.toString()
            });
        });
});

app.post('/countries', function (req, res) {
    let statement = jubarte.statement.create(),
        country = req.body; 

    statement
        .sql('COUNTRIES.INSERT')
        .addParameters()
            .name('ID').direction(jubarte.oracledb.OUT_BIND)
            .name('NAME').value(req.body.name)
        .executeProcedure()
        .then((data) => {
            country.id = data.outBinds.ID;
            res.status(200).send(country);
        })
        .finally(() => {
            statement.done();
        })
        .catch((err) => {
            res.status(500).send({
                code: 500,
                message: err.toString()
            });
        });
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

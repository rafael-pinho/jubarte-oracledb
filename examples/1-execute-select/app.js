const express = require('express'),
      app = express(),
      databaseConfiguration = require('./configuration.js'),
      jubarte = require('jubarte-oracledb');

app.get('/', function (req, res) {
    let statement = jubarte.statement.create('SELECT SYSDATE FROM DUAL');
    
    statement
        .execute()
        .then((data) => {
            res.status(200).send(data.rows[0].SYSDATE);
        })
        .finally(() => {
            statement.done();
        })
        .catch((err) => {
            res.status(500).json({
                code: 500,
                message: err.toString()
            });
        })
});

app.get('/format', function (req, res) {
    let statement = jubarte.statement.create('SELECT SYSDATE FROM DUAL');
    
    statement
        .execute()
        .then((data) => {
            res.status(200).json({
                date: data.rows[0].SYSDATE
            });
        })
        .finally(() => {
            statement.done();
        })
        .catch((err) => {
            res.status(500).json({
                code: 500,
                message: err.toString()
            });
        })
});

app.get('/:level', function (req, res) {
    let statement = jubarte.statement.create();
    
    statement
        .sql('SELECT LEVEL, SYSDATE FROM DUAL CONNECT BY LEVEL <= :MAX_LEVEL')
        .addParameters()
            .name('MAX_LEVEL').value(req.params.level)
        .execute()
        .then((data) => {
            res.status(200).json(data.rows)
        })
        .finally(() => {
            statement.done();
        })
        .catch((err) => {
            res.status(500).json({
                code: 500,
                message: err.toString()
            });
        });
});

app.get('/:level/format', function (req, res) {
    let statement = jubarte.statement.create();
    
    statement
        .sql('SELECT LEVEL, SYSDATE FROM DUAL CONNECT BY LEVEL <= :MAX_LEVEL')
        .addParameters()
            .name('MAX_LEVEL').value(req.params.level)
        .execute()
        .then((data) => {
            res.status(200).json(data.rows.map((row) => {
                return {
                    date: row.SYSDATE,
                    level: row.LEVEL
                }
            }));
        })
        .finally(() => {
            statement.done();
        })
        .catch((err) => {
            res.status(500).json({
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

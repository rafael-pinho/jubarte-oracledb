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

app.get('/', function (req, res) {
    jubarte
        .statement.create('SELECT SYSDATE FROM DUAL')
        .execute()
        .then((data) => {
            res.status(200).send(data.rows[0].SYSDATE);
        })
        .catch((err) => {
            res.status(500).json({
                code: 500,
                message: err.toString()
            });
        })
});

app.get('/format', function (req, res) {
    jubarte
        .statement.create('SELECT SYSDATE FROM DUAL')
        .execute()
        .then((data) => {
            res.status(200).json({
                date: row.SYSDATE
            });
        })
        .catch((err) => {
            res.status(500).json({
                code: 500,
                message: err.toString()
            });
        })
});

app.get('/:level', function (req, res) {
    jubarte
        .statement.create('SELECT LEVEL, SYSDATE FROM DUAL CONNECT BY LEVEL <= :MAX_LEVEL')
        .addParameters()
            .name('MAX_LEVEL').value(req.params.level)
        .execute()
        .then((data) => {
            res.status(200).json(data.rows)
        })
        .catch((err) => {
            res.status(500).json({
                code: 500,
                message: err.toString()
            });
        })
});

app.get('/:level/format', function (req, res) {
    jubarte
        .statement.create('SELECT LEVEL, SYSDATE FROM DUAL CONNECT BY LEVEL <= :MAX_LEVEL')
        .addParameters()
            .name('MAX_LEVEL').value(req.params.level)
        .execute()
        .then((data) => {
            res.status(200).json(data.rows.map((row) => {
                return {
                    date: row.SYSDATE,
                    level: row.LEVEL
                }
            }))
        })
        .catch((err) => {
            res.status(500).json({
                code: 500,
                message: err.toString()
            });
        })
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
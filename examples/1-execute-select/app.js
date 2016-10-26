const express = require('express'),
      app = express(),
      databaseConfiguration = require('./configuration.js'),
      jubarte = require('jubarte-oracledb');

app.get('/', function (req, res) {
    if(req.query.level)
        executeWithParameters(req.query.level);
    else
        executeWithoutParameters();

    function executeWithParameters(maxLevel){
        statement
            .sql('SELECT LEVEL, SYSDATE FROM DUAL CONNECT BY LEVEL <= :MAX_LEVEL')
            .addParameters()
                .name('MAX_LEVEL').value(maxLevel)
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
    }

    function executeWithoutParameters(){
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
            });
    }
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

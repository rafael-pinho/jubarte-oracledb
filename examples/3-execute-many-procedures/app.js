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

app.get('/countries?expand=true', function (req, res) {
});

function getCities(countryId){

}

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
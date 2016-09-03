const jubarte = require('../../lib/index.js');

jubarte.initialize.addConnectionPool({
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
            res.status(200).send(data.rows[0][0]);
        })
        .catch((err) => {
            res.status(500).send(err.toString());
        })
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
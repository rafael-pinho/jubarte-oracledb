let jubarte = require('jubarte-oracledb');
jubarte.initialize.setCredentials({
    user: process.env.ORACLE_USER, 
    password: process.env.ORACLE_PASSWORD, 
    connectString: process.env.ORACLE_CONNECTION_STRING 
});

let express = require('express'),
    app = express();

app.get('/', function (req, res) {
    jubarte
        .statement('SELECT SYSDATE FROM DUAL;')
        .execute()
        .then((data) => {
            res.status(200).send(data.rows[0].SYSDATE);
        })
        .catch((err) => {
            res.status(500).end();
        })
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
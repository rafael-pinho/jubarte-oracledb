const express = require('express'),
      app = express(),
      databaseConfiguration = require('./configuration.js'),
      jubarte = require('jubarte-oracledb');

app.post('/countries/:countryId/cities', function (req, res) {
    let cities = req.body,
        statement = jubarte.statement.create().connect();
    
    Promise.all(cities.map((city) => {
        return addCity(req.params.countryId, city.name, statement);
    }))
    .spread((...results) => {
        cities = results.map((result, i) => {
            return {
                id: result.outBinds.ID,
                name: cities[i].name
            } 
        });
    })
    .then(() => {
        res.status(200).json(cities);
    })
    .finally(() => {
        statement.done();
    })
    .catch((e) => {
        res.status(500).send(err.toString());
    });
});

function addCity(cityName, statement){
    return statement
                .sql('CITIES.INSERT')
                .addParameters()
                    .name('ID').direction(jubarte.oracledb.OUT_BIND)
                    .name('NAME').value(cityName)
                .executeProcedure();
}

databaseConfiguration((err) => {
    if(!err){
        app.listen(3000, function () {
            console.log('Example app listening on port 3000!');
        });
    }
    else
        throw err;
});

const express = require('express'),
      app = express(),
      databaseConfiguration = require('./configuration.js'),
      jubarte = require('jubarte-oracledb');

app.post('/countries', function (req, res) {
    let country = req.body,
        statement = jubarte.statement.create();

    addCountry(country.name, statement)
        .then((result) => {
            country.id = result.outBinds.ID;
            return country.cities.map(city => {
                return addCity(city.name, statement);
            })
        })
        .spread((...results) => {
            country.cities = results.map((result, i) => {
                return {
                    id: result.outBinds.ID,
                    name: country.cities[i].name
                } 
            })

            return statement.commit();
        })
        .then(() => {
            res.status(200).json(country);
        })
        .finally(() => {
            statement.done();
        })
        .catch((e) => {
            res.status(500).send(err.toString());
        });
});

function addCountry(countryName, statement){
    return statement
                .sql('COUNTRIES.INSERT')
                .addParameters()
                    .name('ID').direction(jubarte.oracledb.OUT_BIND)
                    .name('NAME').value(countryName)
                .executeProcedure();
}

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

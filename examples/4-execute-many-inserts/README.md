## Execute many procedures in the same transaction

In this sample we have too make many insert operations.
We need to insert many cities in one country.

This is the received array 

``` javascript
    cities: [{name: 'Torino'}, {name: 'Milano'}, {name: 'Florenza'}]
```

To do this we need to call all the statement with the same object created by jubart.  
First create one function to call the procedure: "addCity".
It needs the country id, the name of the city and a "statement" object. The last one will be created with jubarte.

``` javascript
function addCity(countryId, cityName, statement){
    return statement
                .sql('CITIES.INSERT')
                .addParameters()
                    .name('COUNTRYID').value(countryId)
                    .name('CITYID').direction(oracledb.OUT_BIND)
                    .name('NAME').value(cityName)
                .executeProcedure();
}
```

Now let's call the procs. First, create a statement.

``` javascript
app.post('/countries/:countryId/cities', function (req, res) {
    let cities = req.body,
        statement = jubarte.statement.create();
});
```

The only difference between this and a normal stored procedure execution is the 'connect' function.
When you execute one statement jubarte open a connection.
This connection is used to execute all commands and it dies when you call done function.
In this case, the statement has no open connection yeat and you want to execute many calls in the same moment, so,
you need to connect first to jubarte use the same connection.

``` javascript
app.post('/countries/:countryId/cities', function (req, res) {
    let cities = req.body,
        statement = jubarte.statement.create().connect();
});
```

Now call "addCity" and return the results as you cann see in the complete code below.

``` javascript
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

function addCity(countryId, cityName, statement){
    return statement
                .sql('CITIES.INSERT')
                .addParameters()
                    .name('COUNTRYID').value(countryId)
                    .name('CITYID').direction(oracledb.OUT_BIND)
                    .name('NAME').value(cityName)
                .executeProcedure();
}
```

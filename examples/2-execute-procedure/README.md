## EXECUTE PROCEDURES

Execute stored procedures is very simple. Let's use the following statement to show how jubarte call procedures:

```
    BEGIN PACKAGE.PROCEDURE :CURSORPARAMETER, :PARAMETER, :OTHERPARAMETER; END;
```

In jubarte you just need to:

``` javascript
    let statement = jubarte.statement.create('PACKAGE.PROCEDURE')
    statement
        .addParameters()
            .name('CURSORPARAMETER').direction(oracle.OUT_BIND)
            .name('PARAMETER').value(10)
            .name('OTHERPARAMETER').value('a string value')
```

To get cursor results you need to use 'fetchProcedure' method

``` javascript
    let statement = jubarte.statement.create('PACKAGE.PROCEDURE')
    statement
        .addParameters()
            .name('CURSORPARAMETER').direction(oracle.OUT_BIND)
            .name('PARAMETER').value(10)
            .name('OTHERPARAMETER').value('a string value')
        .fetchProcedure()
        .then((data) => {
            res.status(200).send(data[0]);
        })
        .finally(() => {
            statement.done();
        })
        .catch((err) => {
            res.status(500).send(err.toString());
        })
```

The "data" is an array with all cursors data.So if you have:

* A single cursor:
``` javascript
    [
        [ // my cursor data
            {id: 1, name: 'Brazil'},
            {id: 2, name: 'Germany'},
            {id: 3, name: 'USA'}
        ]
    ]
```

* Two or more:
``` javascript
    [
        [ // my first cursor data
            {id: 1, name: 'Brazil'},
            {id: 2, name: 'Germany'},
            {id: 3, name: 'USA'}
        ],
        [ // my second cursor data
            {id:1, countryId: 1, name: 'São Paulo'},
            {id:2, countryId: 1, name: 'Franca'},
            {id:18, countryId: 2 name: 'Berlin'}
            {id:54, countryId: 3 name: 'New York'}
        ] 
        // here we can have more cursors
        //...
    ]
```

Let's do another sample, without cursors.

```
    BEGIN PACKAGE.PROCEDURE :OUTPARAMETER, :PARAMETER; END;
```

Now we will construct our call

``` javascript
    let statement = jubarte.statement.create('PACKAGE.PROCEDURE')
    statement
        .addParameters()
            .name('OUTPARAMETER').direction(oracle.OUT_BIND)
            .name('PARAMETER').value('a string value')
```

To execute a procedure that don't return cursors use "executeProcedure"

``` javascript
    let statement = jubarte.statement.create('PACKAGE.PROCEDURE')
    statement
        .addParameters()
            .name('OUTPARAMETER').direction(oracle.OUT_BIND)
            .name('PARAMETER').value('a string value')
        .executeProcedure()
        .then((data) => {
            res.status(200).send(data.outBinds.OUTPARAMETER);
        })
        .finally(() => {
            statement.done();
        })
        .catch((err) => {
            res.status(500).send(err.toString());
        })
```

The out parameters will stay in "data.outBinds" property.
If you use "executeProcedure" and return a cursor, the cursor will be in "data.outBinds" too but you will need to fetch cursors by your own. 
To know how fetch cursors see oracledb docs or ["fetchProcedure"](../../lib/statement/statement.js) function code.

The "execute" function works equal "executeProcedure" but you need to pass the entire command.

``` javascript
    let statement = jubarte.statement.create('BEGIN PACKAGE.PROCEDURE :OUTPARAMETER, :PARAMETER; END;')
    statement
        .addParameters()
            .name('OUTPARAMETER').direction(oracle.OUT_BIND)
            .name('PARAMETER').value('a string value')
        .execute()
        .then((data) => {
            res.status(200).send(data.outBinds.OUTPARAMETER);
        })
        .finally(() => {
            statement.done();
        })
        .catch((err) => {
            res.status(500).send(err.toString());
        })
```

You can use "execute" but I recommend "executeProcedure" and "fetchProcedure" instead.

## Execute procedures

Execute stored procedures is very simple and is like execute simple queries.
We have two functions: to execute procedures that has no cursors and to execute procedures with cursors.

### Execute procedures without cursors

Let's use the following statement to show how jubarte call procedures:

```
    BEGIN MYPACKAGE.MYPROCEDURE :OUTPARAMETER, :PARAMETER, :OTHERPARAMETER; END;
```

First, you don't need to write the entire statement, just package and procedure name:

``` javascript
    let statement = jubarte.statement.create('MYPACKAGE.MYPROCEDURE');
```

Now, let's add our parameters:

``` javascript
    let statement = jubarte
                        .statement
                        .create('MYPACKAGE.MYPROCEDURE')
                        .addParameters()
                            .name('OUTPARAMETER').direction(jubarte.oracledb.BIND_OUT).type(jubarte.oracledb.NUMBER)
                            .name('PARAMETER').value(10)
                            .name('OTHERPARAMETER').value('a string value')
```

Finally, call the stored procedure:

``` javascript
    let statement = jubarte
                        .statement
                        .create('MYPACKAGE.MYPROCEDURE')
                        .addParameters()
                            .name('OUTPARAMETER').direction(jubarte.oracledb.BIND_OUT).type(jubarte.oracledb.NUMBER)
                            .name('PARAMETER').value(10)
                            .name('OTHERPARAMETER').value('a string value')
                        .executeProcedure()
                            .then((result) => {
                                res.status(200).send({
                                    id: result.outBinds.OUTPARAMETER
                                });
                            })
                            .finally(() => {
                                statement.done();
                            })
                            .catch((err) => {
                                res.status(500).send(err.toString());
                            });
```

The parameter 'result' is an object. His outBinds property have output parameters value.

### Execute procedures with cursors

Let's use the following statement to show how jubarte call procedures:

```
    BEGIN MYPACKAGE.MYPROCEDURE :CURSORPARAMETER, :PARAMETER; END;
```

First, you don't need to write the entire statement, just package and procedure name:

``` javascript
    let statement = jubarte.statement.create('MYPACKAGE.MYPROCEDURE');
```

Now, let's add our parameters:

``` javascript
    let statement = jubarte
                        .statement
                        .create('MYPACKAGE.MYPROCEDURE')
                        .addParameters()
                            .name('CURSORPARAMETER').direction(oracle.OUT_BIND).type(jubarte.oracledb.CURSOR)
                            .name('PARAMETER').value(10)
```

Finally, call the stored procedure:

``` javascript
    let statement = jubarte
                        .statement
                        .create('MYPACKAGE.MYPROCEDURE')
                        .addParameters()
                            .name('CURSORPARAMETER').direction(oracle.OUT_BIND).type(jubarte.oracledb.CURSOR)
                            .name('PARAMETER').value(10)
                        .fetchProcedure()
                            .then((result) => {
                                res.status(200).json(result[0]);
                            })
                            .finally(() => {
                                statement.done();
                            })
                            .catch((err) => {
                                res.status(500).send(err.toString());
                            });
```

The parameter 'result' is an array. Each item is another array with one cursor data.

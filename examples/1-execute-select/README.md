## EXECUTE SELECT COMMANDS

Execute commands are easy. Let's use the following command as sample:

```
    SELECT SYSDATE FROM DUAL
```

In jubarte you just need to:

```
    let statement = jubarte.statement.create('SELECT SYSDATE FROM DUAL');
    statement.execute()
```

After execute, the result will be in data.rows

```
    let statement = jubarte.statement.create('SELECT SYSDATE FROM DUAL');
    statement
        .execute()
        .then((data) => {
            res.status(200).send(data.rows);
        })
        .finally(() => {
            statement.done();
        })
        .catch((err) => {
            res.status(500).send(err.toString());
        });
```

Now, if you have parameters you can:

```
    let statement = jubarte.statement.create('SELECT :PARAMETER AS VAL, SYSDATE FROM DUAL');
    statement
        .addParameters(10)
        .execute()
```

or:

```
    let statement = jubarte.statement.create('SELECT :PARAMETER AS VAL, SYSDATE FROM DUAL');
    statement
        .addParameters()
            .name('PARAMETER').value(10)
        .execute()
```

After execute, the result will be in data.rows too

```
    let statement = jubarte.statement.create('SELECT :PARAMETER AS VAL, SYSDATE FROM DUAL');
    statement
        .addParameters()
            .name('PARAMETER').value(10)
        .execute()
        .then((data) => {
            res.status(200).send(data.rows);
        })
        .finally(() => {
            statement.done();
        })
        .catch((err) => {
            res.status(500).send(err.toString());
        });
```

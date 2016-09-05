## EXECUTE SELECT COMMANDS

Execute commands are easy. Let's use the following command as sample:

```
    SELECT SYSDATE FROM DUAL
```

In jubarte you just need to:

```
    jubarte
        .statement.create('SELECT SYSDATE FROM DUAL')
        .execute()
```

After execute, the result will be in data.rows

```
    jubarte
        jubarte
        .statement.create('SELECT SYSDATE FROM DUAL')
        .execute()
        .then((data) => {
            res.status(200).send(data.rows);
        })
        .catch((err) => {
            res.status(500).send(err.toString());
        })
```

Now, if you have parameters you can:

```
    jubarte
        .statement.create('SELECT :PARAMETER AS VAL, SYSDATE FROM DUAL')
        .addParameters(10)
        .execute()
```

or:


```
    jubarte
        .statement.create('SELECT :PARAMETER AS VAL, SYSDATE FROM DUAL')
        .addParameters()
            .name('PARAMETER').value(10)
        .execute()
```

After execute, the result will be in data.rows too

```
    jubarte
        .statement.create('SELECT :PARAMETER AS VAL, SYSDATE FROM DUAL')
        .addParameters()
            .name('PARAMETER').value(10)
        .execute()
        .then((data) => {
            res.status(200).send(data.rows);
        })
        .catch((err) => {
            res.status(500).send(err.toString());
        })
```
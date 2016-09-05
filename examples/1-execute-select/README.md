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

The result is in data.rows

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

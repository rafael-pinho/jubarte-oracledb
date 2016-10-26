## Execute commands 

Execute commands are easy. The next two samples will show how to execute commands and add parameters

### Execute commands without parameters

Let's execute this simple sql command:

```
    SELECT SYSDATE FROM DUAL
```

In jubarte you need to first write your statement, then execute it:

``` javascript
    let statement = jubarte.statement.create('SELECT SYSDATE FROM DUAL');
    statement.execute()
```

After execute, the result will be in data.rows

``` javascript
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

# Execute commands with parameters

Let's execute this simple sql command:

```
    SELECT SYSDATE, :PARAMETER FROM DUAL
```

First, let's write our statement.

``` javascript
    let statement = jubarte.statement.create('SELECT :PARAMETER AS VAL, SYSDATE FROM DUAL');
```

Now, we have two ways to add parameters:

``` javascript
    let statement = jubarte.statement.create('SELECT :PARAMETER AS VAL, SYSDATE FROM DUAL');
    statement
        .addParameters(10)
```

or:

``` javascript
    let statement = jubarte.statement.create('SELECT :PARAMETER AS VAL, SYSDATE FROM DUAL');
    statement
        .addParameters()
            .name('PARAMETER').value(10)
```

After add parameters, execute it and the result will be in data.rows:

``` javascript
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

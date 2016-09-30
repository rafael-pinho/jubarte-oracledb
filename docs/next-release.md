## 3.0-beta

This release was created because of two problems in release 2.0 and new features will not be added.

## Features

| Feature | Status |
|---|:---:|
| Handle connections | done |
| Call statements | done |
| Automatic cursor fetch | done |
| Promises instead of callbacks | done |
| Transactions | done |
| Multiple databases support | done |

## Bugs

1. In 2.0 has no possibility to wait pool creation end to start your app
    - fix
2. In 2.0 has a deadlock occour when you try to execute many inserts in one table without a previous connection created
    - working

## Changes

1. Will not be possible to create a pool passing options to "execute" methods like the sample below:
```
    let jubarte = require('jubarte-oracledb')
        statement = jubarte.statement.create('SELECT SYSDATE FROM DUAL');
        
    statement.execute({
        user: 'myuser', password: 'mypassword', connectString: 'localhost:1521/xe'
    });
```

You can still pass a pool name but the pool need to be previous created. To understand see the sample below:
```
    let jubarte = require('jubarte-oracledb');
    
    jubarte.configuration.pool.add({
         user: 'myuser', password: 'mypassword', connectString: 'localhost:1521/xe', poolAlias: 'mypool'
    })
    
    let statement = jubarte.statement.create('SELECT SYSDATE FROM DUAL');    
    statement.execute('mypool');
```

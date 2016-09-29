## CONFIGURE JUBARTE

Is easy. We have two types of configuration: 

* oracledb
 - set oracledb defaults, like auto commit, return format, and max rows returned
* pools
 - create connection pools

To configure oracledb, just call jubarte and pass an object with options, (defaults in sample):

```
const jubarte = require('../../lib/index.js'),
      oracledb = require('oracledb');

jubarte.configuration.oracledb.set({
    autoCommit: false,
    maxRows: 100,
    outFormat: oracledb.OBJECT,
    prefetchRows: 100
});
```

Now, to create pools

```
const jubarte = require('../../lib/index.js'),
      oracledb = require('oracledb');

jubarte.configuration.oracledb.set({
    autoCommit: false,
    maxRows: 100,
    outFormat: oracledb.OBJECT,
    prefetchRows: 100
});

jubarte.configuration.pool.add({
    user: 'myuser', 
    password: 'mypassword', 
    connectString: 'localhost:1521/xe'
}).then((pool) => {
    //You can make some code here, this will execute when the pool is created
});
```
### You don't need to configure oracle but you must configure a pool always (v3.0 and above)

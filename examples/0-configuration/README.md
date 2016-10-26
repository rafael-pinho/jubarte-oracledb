## CONFIGURE JUBARTE

Is easy. We have two types of configuration: 

* oracledb
  - set oracledb defaults, like auto commit, return format, and max rows returned. 
  To know more about oracledb configuration check node-oracledb docs.
* pools
  - create connection pools

To configure oracledb, just call jubarte and pass an object with configuration options. 
This method is not required and database will have some defaults if you not configure it. 
You can see the defaults below.

``` javascript
const jubarte = require('jubarte-oracledb');

jubarte.initialize.setOracleDefaults({
    autoCommit: false,
    maxRows: 100,
    outFormat: jubarte.oracledb.OBJECT,
    prefetchRows: 100
})
```

Now, to create pools, just call 'addConnectionPool'. 
This method returns a promise.
There are three required properties: 
user (database connection user), password (database connection user password) and connectString (ip, port and service name).
All other options are not required and you can see the default values below.

``` javascript
const jubarte = require('jubarte-oracledb');

jubarte.initialize.setOracleDefaults({
    autoCommit: false,
    maxRows: 100,
    outFormat: jubarte.oracledb.OBJECT,
    prefetchRows: 100
})
.addConnectionPool({
    poolAlias: 'default', 
    poolMax: 10,
    poolMin: 4,
    poolIncrement: 2, 
    poolTimeout: 60,
    queueRequests: true,
    queueTimeout: 5,
    stmtCacheSize: 30,
    user: process.env.ORACLE_USER, 
    password: process.env.ORACLE_PASSWORD, 
    connectString: process.env.ORACLE_CONNECTION_STRING 
})
.then(() => {
    callback();
})
.catch((e) => {
    callback(e);
});
```

If you want to configure more than one pool you can do a code like this:

``` javascript
const jubarte = require('jubarte-oracledb'),
      Promise = require('bluebird'),
      promises = [];

jubarte.initialize.setOracleDefaults({
    autoCommit: false,
    maxRows: 100,
    outFormat: jubarte.oracledb.OBJECT,
    prefetchRows: 100
});

promises.push(jubarte.initialize.addConnectionPool({
    poolAlias: 'firstPool', 
    user: process.env.ORACLE_USER, 
    password: process.env.ORACLE_PASSWORD, 
    connectString: process.env.ORACLE_CONNECTION_STRING 
}));

promises.push(jubarte.initialize.addConnectionPool({
    poolAlias: 'secondPool', 
    user: process.env.ORACLE_USER, 
    password: process.env.ORACLE_PASSWORD, 
    connectString: process.env.ORACLE_CONNECTION_STRING 
}));

Promise.all(promises)
    .then(() => {
        callback();
    })
    .catch((e) => {
        callback(e);
    });
```

## CONFIGURE JUBARTE

Is easy. We have two types of configuration: 

* oracledb
 - set oracledb defaults, like auto commit, return format, and max rows returned
* pools
 - create connection pools

To configure oracledb, just call jubarte and pass an object with options, (defaults in sample):

```
const jubarte = require('jubarte-oracledb'),
      oracledb = require('oracledb');

jubarte.initialize.setOracleDefaults({
    outBinds: oracledb.OBJECT
})
```

Now, to create pools

```
const jubarte = require('jubarte-oracledb'),
      oracledb = require('oracledb');

jubarte.initialize.setOracleDefaults({
    outBinds: oracledb.OBJECT
})
.addConnectionPool({
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

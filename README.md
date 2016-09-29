[![bitHound Overall Score](https://www.bithound.io/github/rafael-pinho/jubarte-oracledb/badges/score.svg)](https://www.bithound.io/github/rafael-pinho/jubarte-oracledb)

# jubarte-oracledb
A future npm package to make and execute commands in oracledb.

Before use use jubarte-oracledb, see the section below. To view implementation details go to [examples directory](./examples). 

## About

### v2.0 Production Ready. ###
### v3.0 will have some incompatibilities. See [next release notes](./docs/next-release.md) ###
### Now I focus in solve two bugs. See [next release notes](./docs/next-release.md) ###

### If you have some issues, please, open an issue or send a pull request. ###

You need to know some things to use this package.

1. Oracledb
   * this package uses the official driver to connect to oracle
   * tested in nodejs v6.0.0 and above 
   * for more info about oracle-db driver see node-oracledb documentation

2. Connections
    * do not worry about get a connection, jubarte-oracledb manages connections
    * jubarte-oracledb always use a pool of connections to work
    * you can configure your connection pool
    * always call statement's 'done' method so jubart will know that is time to close connection

3. Fetch Cursors
    * automatic fetchs cursors for you with you want

4. Transactions
    * jubarte supports transactions.
    * see [this example](./examples/3-execute-many-procedures) to know how it works
    
5. Promises instead of callbacks
    * no more callback hell
    * jubarte uses bluebird lib to work with promises

6. Next Releases
    * see the features list above to know what is comming

## Features

| Feature | Status |
|---|:---:|
| Handle connections | done |
| Call statements | done |
| Automatic cursor fetch | done |
| Promises instead of callbacks | done |
| Transactions | done |
| Multiple databases support | done |
| Bulk inserts | next release |
| Streams | next release |
| Event Emitter | one day |
| Status Panel | one day |
| Simple ORM | one day |

## Tests
See [test directory](test/).

## Contributing
Open issues, pull requests, add tests, new ideas or whatever...contributors are welcome.

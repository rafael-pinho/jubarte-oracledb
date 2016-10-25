[![bitHound Overall Score](https://www.bithound.io/github/rafael-pinho/jubarte-oracledb/badges/score.svg)](https://www.bithound.io/github/rafael-pinho/jubarte-oracledb)

# jubarte-oracledb
A npm package to make and execute commands in oracledb.

Before use use jubarte-oracledb, see the section below. To view implementation details go to [examples directory](./examples). 

## About

### v3.0 Production Ready. ###
### v3.0 has some incompatibilities. See [next release notes](./docs/next-release.md) ###
### v3.0 has two bugs fixed. See [next release notes](./docs/next-release.md) ###
### now the focus is make better samples and docs ###
### If you have some issues, please, open an issue or send a pull request. ###

1. Oracledb
   * this package uses the official driver to connect to oracle
   * tested in nodejs v6.0.0 and above 
   * for more info about oracledb driver see node-oracledb documentation

2. Connections
    * jubarte-oracledb manages connections
    * jubarte-oracledb always use a pool of connections to work
    * you just need to configure your connection pools. See [this example](./examples/0-configuration) to know how.
    * never forget to call 'done' method so jubart will know that is time to close connection. See [this example](./examples/1-execute-select) to know how.

3. Fetch Cursors
    * automatic fetchs cursors for you with you want. See [this example](./examples/2-execute-procedure) to know how it works.

4. Transactions
    * jubarte supports transactions.
    * see [this example](./examples/3-execute-many-procedures) to know how it works.
    
5. Promises instead of callbacks
    * no more callback hell.
    * jubarte uses bluebird lib to work with promises.

6. Next Releases
    * see the features list above to know what is comming.

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

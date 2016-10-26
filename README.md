[![bitHound Overall Score](https://www.bithound.io/github/rafael-pinho/jubarte-oracledb/badges/score.svg)](https://www.bithound.io/github/rafael-pinho/jubarte-oracledb)

# jubarte-oracledb

A npm package to make and execute commands in oracledb.

Before start use jubarte-oracledb, see the sections below. 

### v3.0 Production Ready. ###
### v3.0 Has 3 bug fixes and one incompatibility with v2.0 code. See [v3.0 notes](./docs/next-release.md). ###
### Now the focus is make better samples and docs. ###
### If you have some issues, please, open an issue or send a pull request with the bug fix. ###

## Index

1. [About](#about)
2. [Features](#features)
3. [Examples](#examples)
4. [Tests](#tests)

## About

### Oracledb
  * tested in nodejs v6.0.0 and above 
  * this package uses the official driver to connect to oracle
  * for more info about oracledb driver see node-oracledb documentation

### Connections
  * jubarte-oracledb always use a pool of connections to work
  * you just need to configure your connection pools. 
  See [this example](./examples/0-configuration) to know how.
  * never forget to call 'done' method so jubart will know that is time to close connection. 
  See [this example](./examples/1-execute-select) to know how.

### Execute
  * code less
  * jubarte has a easy way to execute stored procedures
  * automatic fetchs cursors for you with you want. 
  * see [this example](./examples/2-execute-procedure) to know how it works.

### Transactions
  * jubarte supports transactions.
  See [this example](./examples/3-execute-many-procedures) to know how it works.
    
### Promises instead of callbacks
  * works only with promises.
  * jubarte uses bluebird lib to work with promises.

## Features

| Feature | Status |
|---|:---:|
| Handle connections | done |
| Call statements | done |
| Automatic cursor fetch | done |
| Promises instead of callbacks | done |
| Transactions | done |
| Multiple databases support | done |
| Streams | next release |
| Bulk inserts | next release |
| Event Emitter | one day |
| Status Panel | one day |
| Simple ORM | one day |

## Examples
See [examples directory](examples/).

## Tests
See [test directory](test/).

## Contributing
Open issues, pull requests, add tests, new ideas or whatever...contributors are welcome.

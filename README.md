# jubarte-oracledb
A future npm package to make and execute commands in oracledb.

## How to?
One day [examples directory](examples) will have many samples. Before start use jubarte-oracledb, see [this section](##Notes)

## Notes
You need to know some things to use this package.

1. Oracledb
   * this package uses the official driver to connect to oracle
   * for more info see node-oracledb documentation

2. Connections
    * do not worry about get a connection, jubarte-oracledb manages connections
    * jubarte-oracledb always use a pool of connections to work
    * you can configure your connection pool
    * always call statement's 'done' method so jubart will know that is time to close connection

3. Transactions
    * not implemented
    * will be avaliable in the second release (v0.2)

## Tests
See [test directory](test/).

## Contributing
Open issues, pull requests, add tests, new ideas or whatever...contributors are welcome.
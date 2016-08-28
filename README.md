# jubarte-oracledb
A future npm package to make and execute commands in oracledb.

## How to?
One day [examples directory](examples) will have many samples.

## Notes
You need to know some important things to use this package.

1. Oracledb
   * this package uses the official driver to connect to oracle
   * for more info see node-oracledb documentation

2. Connections
    * do not worry about get a connection, jubarte-oracledb manages connections
    * jubarte-oracledb always use a pool of connections to work
    * but you can configure your connection pool
    * and you always need to end a statement so jubart will know that is time to close connection

3. Transactions
    * not implemented
    * will be avaliable in the second release (v0.2)

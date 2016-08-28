# jubarte-oracledb
A future npm package to make and execute commands in oracledb.

## How to?
Before use use jubarte-oracledb, see [this section](##Notes)

One day [examples directory](examples) will have many samples. 

## Notes
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

3. Transactions
    * not implemented
    * will be avaliable in v0.2

3. Next Releases
    * see [features checkList](##Implementations checkList) to know what is comming

## Tests
See [test directory](test/).

## Features checkList

- :white_medium_small_square: Handle connections
- :white_medium_small_square: Call statements
- :small_red_triangle: Transactions
- :small_orange_diamond: Event Emitter
- :small_orange_diamond: Status Panel
- :small_orange_diamond: Simple ORM

| simbol | status |
|---|---|
| :white_check_mark:: | done |
| :white_medium_small_square: | in development |
| :small_red_triangle: | next release feature |
| :small_orange_diamond: | one day feature |
| :heavy_exclamation_mark: | warning |

## Contributing
Open issues, pull requests, add tests, new ideas or whatever...contributors are welcome.
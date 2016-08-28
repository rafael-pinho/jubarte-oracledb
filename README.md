# jubarte-oracledb
A future npm package to make and execute commands in oracledb.

## How to?
Before use use jubarte-oracledb, see [this section](#Notes)

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
    * see [features checkList](#Implementations checkList) to know what is comming

## Tests
See [test directory](test/).

## Features checkList

  :small_orange_diamond: Handle connections
  
  :small_orange_diamond: Call statements
  
  :small_red_triangle: Transactions
  
  :small_red_triangle_down: Event Emitter
  
  :small_red_triangle_down: Status Panel
  
  :small_red_triangle_down: Simple ORM

| simbol | status |
|:---:|---|
| :small_blue_diamond: | done |
| :small_orange_diamond: | in development |
| :small_red_triangle: | next release feature |
| :small_red_triangle_down: | one day feature |
| :heavy_exclamation_mark: | warning |

## Contributing
Open issues, pull requests, add tests, new ideas or whatever...contributors are welcome.

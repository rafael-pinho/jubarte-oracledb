# jubarte-oracledb
A future npm package to make and execute commands in oracledb.

## How to?
Before use use jubarte-oracledb, see the section above. To view implementation details go to [examples directory](./examples). 

### I'm making tests with jubarte in production (2 node api's using it). It's ok by now and works. Follow this repository to get news about it. ###

### v1.3 have some bugs but I already fix, use the latest version to get this fixes. In v1.4 some implementation details change, please see [examples directory](./examples) (new implementation do not broke old implementation but is needed to release connections to be used) ###

### If you have some issues, please, open an issue or send a pull request. ###

### In next days more samples will be avaliable. I will make more tests and an docker image to make it easier to test. ###

### Between 19/9 and 23/09 jubarte-oracledb will become production ready.###

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
    * just give the command: jubarte makes commits, roolbacks and closes connections for you
    
3. Fetch Cursors
    * automatic fetchs cursors for you with you want
     
4. Promises instead of callbacks
    * no more callback hell
    * jubarte uses bluebird lib to work with promises

5. Next Releases
    * see the features list above to know what is comming

## Features
- :small_blue_diamond: Handle connections
- :small_blue_diamond: Call statements
- :small_blue_diamond: Automatic CURSOR fetch
- :small_blue_diamond: Promises instead of callbacks
- :small_blue_diamond::heavy_exclamation_mark: Multiple databases support
- :small_blue_diamond::heavy_exclamation_mark: Transactions
- :small_red_triangle: Bulk inserts
- :small_red_triangle: Streams
- :small_red_triangle_down: Event Emitter
- :small_red_triangle_down: Status Panel
- :small_red_triangle_down: Simple ORM

| simbol | status |
|:---:|---|
| :small_blue_diamond: | done |
| :small_orange_diamond: | in development |
| :small_red_triangle: | next release feature |
| :small_red_triangle_down: | one day feature |
| :heavy_exclamation_mark: | warning |

## Tests
See [test directory](test/).

## Contributing
Open issues, pull requests, add tests, new ideas or whatever...contributors are welcome.

# jubarte-oracledb
A future npm package to make and execute commands in oracledb.

## How to?
Before use use jubarte-oracledb, see the section above

One day, (this week), [examples directory](examples) will have some samples. 

### In current version v1.3 multiple database support and transactions are avaliable. Beware, I'm making some tests in production. In next 3 days - 3/9, 4/9 and 5/9 - I will put more samples. I will make more tests too. After 7/9 jubarte-oracledb will be production ready (or not but I realy belive in this).###

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
     
4. No more callbacks
    * no more callback hell
    * jubarte uses bluebird lib to work with promises

5. Next Releases
    * see the features list above to know what is comming

## Tests
See [test directory](test/).

## Features

- :small_blue_diamond: Handle connections
- :small_blue_diamond: Call statements
- :small_blue_diamond: Automatic CURSOR fetch
- :small_blue_diamond: Promises instead of callbacks
- :small_blue_diamond::heavy_exclamation_mark: Multiple databases support
- :small_blue_diamond::heavy_exclamation_mark: Transactions
- :small_red_triangle: Event Emitter
- :small_red_triangle_down: Status Panel
- :small_red_triangle_down: Simple ORM

| simbol | status |
|:---:|---|
| :small_blue_diamond: | done |
| :small_orange_diamond: | in development |
| :small_red_triangle: | next release feature |
| :small_red_triangle_down: | one day feature |
| :heavy_exclamation_mark: | warning |

## Contributing
Open issues, pull requests, add tests, new ideas or whatever...contributors are welcome.

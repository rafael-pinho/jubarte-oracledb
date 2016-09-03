# Instructions
Before run tests you need to do some steps

### I work in a docker image to make this easier to run. It will be avaliable soon ###

## Oracledb
The npm package oracledb needs to be installed in your machine. For more instructions about install, see oracledb documentation.

## Node
This tests running on node v6 or above, (later versions not tested).

## Database
Some tests running commands in a oracle database. So, you will need to connect to a oracle instance (I use Amazon RDS).

## Environment Variables
To be able to connect to oracle, you will need to pass connection string, user name and password. To do this, set this environment variables:

* ORACLE_USER: user name to connect 
* ORACLE_PASSWORD: user password
* ORACLE_CONNECTION_STRING: ip, port and service name

## Mocha
Install dependencies with npm install (mocha will be localy instaled). So you can just type 'npm test' to make a full test. If you want, you can use mocha as you wish.

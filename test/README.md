# Instructions
Before run tests you need to do some steps.

## Node
This tests running on node v6 or above, (later versions not tested).

## Oracledb
The npm package oracledb need to be install. For more instructions about, see oracledb package documentation on github.

## Database
Some tests running commands in a oracle database. So, you will need to connect to a oracle instance. You can use Amazon RDS or any other if you want.

If you have docker instaled you can run a container with oracle database inside:

```
$ docker run -d --name=oracle -p=1521:1521  wnameless/oracle-xe-11g
```

In this case see https://hub.docker.com/r/wnameless/oracle-xe-11g/ to see how this image works.

## Environment Variables
To be able to connect to oracle, you will need to pass connection string, user name and password. To do this, set this environment variables:

* ORACLE_USER: user name to connect 
* ORACLE_PASSWORD: user password
* ORACLE_CONNECTION_STRING: ip, port and service name

## Mocha
Install dependencies with npm install (mocha will be localy instaled). So you can just type 'npm test' to make a full test.
You can use mocha as you wish too.

## Docker compose

####You can use docker compose to run tests too.

Do the following to make it works:

```
$ docker-compose up -d oracle
```

Wait a minute util the database starts. You can check the progress by typing:

```
$ docker-compose logs -f oracle
```

And then test jubarte:

```
docker-compose up jubarte
```

With this command a container with jubarte will start, execute npm install and then npm test to make a full test. 
The output will appear in terminal window. After finish tests, the container will stop.

let statement = require('./statement/statement.js');

let command = 'SELECT SYSDATE FROM DUAL',
            fake = statement.create(command);

fake.execute({
    user          : "jubarte",
    password      : "!jubarte!",
    connectString : "jubarte.cbcwun0ta2kb.sa-east-1.rds.amazonaws.com:1521/ORCL"
  }, (err, data)=> {
      console.log(err)
      console.log(data)
});
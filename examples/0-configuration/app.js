const express = require('express'),
      app = express(),
      databaseConfiguration = require('./configuration.js');

databaseConfiguration((err) => {
    if(!err){
        app.listen(3000, function () {
            console.log('Example app listening on port 3000!');
        });
    }
    else
        throw err;
});

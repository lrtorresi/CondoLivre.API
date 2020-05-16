const express = require('express');
const app = express();
const routes = require('./src/routes');


app.use(express.json({limit: '500mb'})); //Para aceitar Request do tipo JSON
app.use(routes);



app.listen(process.env.PORT || 3333, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
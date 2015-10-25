
### Adding MongoDB to Hot Towel

`npm install mongoose`
`npm install mongoose-q`


`cd src/server`
`touch _dbconfig`
`mkdir models`

#### in _dbconfig set datab

```
var dbconfig = {};

config.mongoURI = {
	test: 'mongodb://localhost/egyptian-crud',
	development: 'mongodb://localhost/egyptian-testing',
	production: process.env.MONGOLAB_URI 
};

module.exports = dbconfig;
```

#### in app.js configure database connection

```

var mongoose = require('mongoose');

// *** config file *** //
var dbconfig = require('./_dbconfig');

// *** database config *** //
mongoose.connect(dbconfig.mongoURI[app.settings.env],
  function(err, res){
    if (err){
      console.log("Failed to connect to DB: "+err);
    } else {
      console.log("Success. Connected to: "+dbconfig.mongoURI[app.settings.env]);
    }
  });

```

#### in models directory create Schemas

`touch items.js`


````
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var itemSchema = new Schema ({
	name: String,
	type: String,
});

var Item = mongoose.model("items", itemSchema);

module.exports = {
	Item: Item,
};
````



### Adding MongoDB to Hot Towel

`npm install mongoose`
`npm install mongoose-q`


`cd src/server`
`touch _dbconfig`
`mkdir models`

#### in _dbconfig set database 
Depending on the current enrironment, set which database to connect to. At the moment we don't have a MONGOLAB database set up, but this sets us up so that we can easily push to Heroku.

```
var dbconfig = {};

config.mongoURI = {
	test: 'mongodb://localhost/egyptian-crud',
	dev: 'mongodb://localhost/egyptian-testing',
	production: process.env.MONGOLAB_URI 
};

module.exports = dbconfig;
```

#### in app.js configure database connection

```

// *** config file *** //
var dbconfig = require('./_dbconfig');

// *** database config *** /    /
mongoose.connect(dbconfig.mongoURI[environment],
    function(err, res) {
        if (err) {
            console.log('Failed to connect to DB: ' + err);
        } else {
            console.log('Success. Connected to: ' + dbconfig.mongoURI[environment]);
        }
    });

// environment === process.env.NODE_ENV
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
	Item: Item
};
````


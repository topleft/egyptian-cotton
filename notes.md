
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

#### CRUD Routes

```
cd src/server
mkdir logic routes
cd routes
touch itemRoutes.js
cd ../logic
touch itemCrud.js
```

in app.js configure Item routes path. It is important to add this above the other routes path config, bacuase there is a fourofour catchall route in routes.js.

```
app.use('/api', require('./routes/itemRoutes'));

```

in itemCrud.js add: 

```
var Item = require("../database.js").Item;
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});

function handleGet(res) {
	Item.findQ({})
		.then(function(response){ res.json(response);})
		.catch(function(err){ res.json(err);})
		.done();
}

function handleGetOne(res, id) {
	Item.findQ({_id: id})
		.then(function(response){ res.json(response);})
		.catch(function(err){ res.json(err);})
		.done();
}

function handlePost(res, name, type) {
	newItem = new Item({name: name, type: type});
	newItem.saveQ()
		.then(function(response){ res.json(response);})
		.catch(function(err){ res.json(err);})
		.done();
}

function handlePut(res, id, name, type) {
	var query = {_id: id};
	var update = {name: name, type: type};
	var option = {new: true};
	Item.findOneAndUpdateQ(query, update, option)
		.then(function(response){ res.json(response);})
		.catch(function(err){ res.json(err);})
		.done();
}


function handleDelete(res, id) {
	Item.removeQ({_id: id})
		.then(function(response){ res.json({message: "Item Deleted"});})
		.catch(function(err){ res.json(err);})
		.done();
}

module.exports = {
	handleGet: handleGet,
	handleGetOne: handleGetOne,
	handlePost: handlePost,
	handlePut: handlePut,
	handleDelete: handleDelete
};
```


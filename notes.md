
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
in core/dataservice.js add into the IIFE:

```
		function getItems() {
            return $http.get('/api/items')
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(e) {
                return exception.catcher('XHR Failed for getItems')(e);
            }
        }

        function getOneItem(id) {
            return $http.get('/api/items/' + id)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(e) {
                return exception.catcher('XHR Failed for getOneItem')(e);
            }
        }

        function createItem(name, type) {
            return $http.post('/api/items', {
                name: name,
                type: type
            })
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(e) {
                return exception.catcher('XHR Failed for createItem')(e);
            }
        }

        function updateItem(id, name, type) {
            return $http.put('/api/items/' + id, {
                name: name,
                type: type
            })
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(e) {
                return exception.catcher('XHR Failed for updateItem')(e);
            }
        }

        function deleteItem(id) {
            return $http.delete('/api/items/' + id)
                .then(success)
                .catch(fail);
            function success(response) {
                return response.data;
            }
            function fail(e) {
                return exception.catcher('XHR Failed for deleteItem')(e);
            }
        }
```

ammend the returned object (services):

```
            getItems: getItems,
            getOneItem: getOneItem,
            creatItem: createItem,
            updateItem: updateItem,
            deleteItem: deleteItem
```

create two folder inside the add folder: features and components

features will more or less refer to whole page views 
components will hold smaller pieces of functionality used within the features

moved admin and dashboiard into features, renamed file paths and module names
created features.module
injected admin and dashboard modules
injected features module in app module and took put dashboard and admin

we will make our crud a feature

created items folder in features, cut and pasted admin files and renamed them with items.*





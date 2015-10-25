
var express = require('express');
var router = express.Router();
var crud = require('../logic/itemCrud');

router.post('/items', function(req, res, next) {
    crud.handlePost(res, req.body.name, req.body.type);
});

router.put('/items/:id', function(req, res, next) {
    crud.handlePut(res, req.params.id, req.body.name, req.body.type);
});

router.delete('/items/:id', function(req, res, next) {
    crud.handleDelete(res, req.params.id);
});

router.get('/items', function(req, res, next) {
    crud.handleGet(res);
});

router.get('/items/:id', function(req, res, next) {
    crud.handleGetOne(res, req.params.id);
});

module.exports = router;

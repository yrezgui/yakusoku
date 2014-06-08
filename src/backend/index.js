var router      = require('express').Router();
var moment      = require('moment');
var db = require('orchestrate')(process.env.ORCHESTRATE_TOKEN || 'e5401146-f72c-442c-9a02-5b1737549d17');

var COLLECTION = 'appointments';

router.get('/', function(req, res, next) {

  var period = moment(req.query.period);

  if(req.query.period && period.isValid() === false) {
    period = moment();
  }

  db.list(COLLECTION, {startKey: period.format('YYYY-MM-'), beforeKey: period.add('M', 1).format('YYYY-MM-')})
    .then(function (result) {
      return res.send(result.body.results);
    })
    .fail(function (result) {
      return res.send(500, result.body);
    });
});

router.post('/', function(req, res, next) {

  var identifier = moment(req.body.id, 'YYYY-MM-DD');

  if(!identifier.isValid()) {
    return res.send(500, {error: 'ID not valid'});
  }

  if(!req.body.attendee || typeof(req.body.attendee) !== 'string') {
    return res.send(500, {error: 'attendee not valid'});
  }

  db.put('collection', identifier.format('YYYY-MM-DD'), {attendee: req.body.attendee}, false)
    .then(function (result) {
      return res.send(result.body);
    })
    .fail(function (result) {
      return res.send(500, result.body);
    });
});

router.get('/:id', function(req, res, next) {
  db.get(COLLECTION, req.params.id)
    .then(function (result) {
      return res.send(result.body);
    })
    .fail(function (result) {
      return res.send(404, result.body);
    });
});

module.exports = router;
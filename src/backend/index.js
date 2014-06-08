var router      = require('express').Router();
var moment      = require('moment');
var Pusher      = require('pusher');
var db          = require('orchestrate')(process.env.ORCHESTRATE_TOKEN);

var pusher = new Pusher({
  appId: process.env.PUSHER_APPID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET
});

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

  db.put(COLLECTION, identifier.format('YYYY-MM-DD'), {attendee: req.body.attendee}, false)
    .then(function (result) {

      var newAppointment = {
        'id': identifier.format('YYYY-MM-DD'),
        'date': identifier.toDate(),
        'attendee': req.body.attendee
      };

      pusher.trigger('appointments', 'new_appointment', newAppointment);

      return res.send(201, newAppointment);
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
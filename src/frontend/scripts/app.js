function Agenda() {
  this.appointments = {};
}

Agenda.prototype = {
  fetchAppointments: function fetchAppointments(date) {
    var self = this;

    return $.ajax({
      type: 'GET',
      url: '/api/',
      data: {period: date}
    })
      .done(function(data) {
        _.each(data, function(appointment) {
          self.appointments[appointment.path.key] = {
            date: appointment.path.key,
            attendee: appointment.value.attendee
          };
        });

        return true;
      })
      .fail(function() {
        alert('There is a problem with the server');
        return false;
      });
  },

  getAppointments: function getAppointments() {
    return _.values(this.appointments);
  },

  getAppointment: function getAppointment(date) {
    var identifier = moment(date).format('YYYY-MM-DD');

    if(!this.appointments[identifier]) {
      return null;
    }

    return this.appointments[identifier];
  },

  createAppointment: function createAppointment(date, name) {
    return $.ajax({
      type: 'POST',
      url: '/api/',
      data: {id: moment(date).format('YYYY-MM-DD'), attendee: name}
    })
      .done(function(data) {
        return true;
      })
      .fail(function() {
        alert('There is a problem with the server');
        return false;
      });
  }
};

var agd = new Agenda();

var cal = $('#full-clndr').clndr({
  weekOffset: 1,
  template: $('#full-clndr-template').html(),
  clickEvents: {
    onMonthChange: function(date){
      var self = this;

      agd.fetchAppointments(date.toDate()).done(function() {
        self.setEvents(agd.getAppointments());
      });
    },
    click: function(target) {
      if(target.events[0]) {
        alert(target.events[0].attendee + ' made an appointment on that day');
        return;
      }

      if(confirm('Would you like to make an appointment ?')) {
        var name = '';

        while(!name) {
          name = prompt('Enter your name');
        }

        agd.createAppointment(target.date, name);
      }
    }
  }
});

agd.fetchAppointments(new Date()).done(function() {
  cal.setEvents(agd.getAppointments());
});
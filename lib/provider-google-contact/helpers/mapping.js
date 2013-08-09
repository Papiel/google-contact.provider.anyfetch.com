// Takes as param a contact as returned by Google Contact API.
// Returns a POJO.
module.exports.googleJsonToPojo = function (c) {
  var r = {};

  if(c['gd$name']){
    if(c['gd$name']['gd$fullName']) {
      r.name = c['gd$name']['gd$fullName']['$t'];
    }
    if(c['gd$name']['gd$givenName']) {
      r.given_name = c['gd$name']['gd$givenName']['$t'];
    }
    if(c['gd$name']['gd$familyName']) {
      r.family_name = c['gd$name']['gd$familyName']['$t'];
    }
  }

  if (c['gd$email']) {
    r.emails = c['gd$email'].map(function(m) {
      return m['address'];
    });
  }

  if(c['gd$phoneNumber']) {
    r.phones = c['gd$phoneNumber'].map(function(p) {
      return p['$t'];
    });
  }

  if(c['gd$im']) {
    r.im = c['gd$im'].map(function(p) {
      var hashIndex = p['protocol'].lastIndexOf('#')
      return {
        'address': p['address'],
        'protocol': p['protocol'].substr(hashIndex+1)
      };
    });
  }

  if (c['gContact$birthday']) {
    r.birthday = new Date(c['gContact$birthday']['when']);
  }

  return r;
}
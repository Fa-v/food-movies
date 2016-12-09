var configValues = require('./config');

module.exports = {
  //connection string to the database
  getDbconnectionString: function () {
    return 'mongodb://' + configValues.uname + ':' + configValues.pwd + '@ds119508.mlab.com:19508/films';
  }
}
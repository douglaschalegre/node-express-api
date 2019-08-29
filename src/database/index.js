const mongoose = require('mongoose');
const uri = 'mongodb+srv://<username>:<password>@hooklyapi-vd574.gcp.mongodb.net/';
mongoose.connect(uri,  {dbName: 'noderest'});
mongoose.Promise = global.Promise;

module.exports = mongoose;
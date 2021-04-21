const mongoose = require('mongoose');

// const MONGO_URI = 'mongodb+srv://vyang:89M5quuC1LjlsXyi@cluster0.q6zwo.mongodb.net/autolit?retryWrites=true&w=majority';

// mongoose.connect(MONGO_URI, {
//   // options for the connect method to parse the URI
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   // sets the name of the DB that our collections are part of
//   dbName: 'autolit'
// })
//   .then(() => console.log('Connected to MongoDB.'))
//   .catch(err => console.log(`Error connecting to MongoDB: ${err}`))

const Schema = mongoose.Schema;

// set schema for the 'seeds' collection
const seedsSchema = new Schema({
  doi: {type: String, required: true},
  title: String,
  authors: String,
  pub_date: Date,
  journal: String
});
// create model for the 'seeds' collection that will be exported
const Seeds = mongoose.model('seeds', seedsSchema);

const ancestorsSchema = new Schema({
  doi: {type: String, required: true},
  title: String,
  authors: String,
  pub_date: Date,
  journal: String
});

const Ancestors = mongoose.model('ancestors', ancestorsSchema)

// export models for use in the controller
module.exports = {
  Seeds,
  Ancestors
};
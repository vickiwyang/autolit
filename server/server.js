const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const seedController = require('./controllers/seedController');
const ancestorController = require('./controllers/ancestorController');

const PORT = 3000;
const MONGO_URI = 'mongodb+srv://vyang:89M5quuC1LjlsXyi@cluster0.q6zwo.mongodb.net/autolit?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'autolit'
})
  .then(() => console.log('Connected to MongoDB.'))
  .catch(err => console.log(`Error connecting to MongoDB: ${err}`))

if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/build', express.static(path.join(__dirname, './../build')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, './../index.html'));
  })
}

app.use(bodyParser.urlencoded({ extended: true }));

// clear previous seeds in database and set new seeds
// get ancestors, process ancestors and find commons
app.post('/seed', seedController.clearSeeds, ancestorController.clearAncestors, seedController.setSeeds, ancestorController.getRefs, (req, res) => {
  // do something upon successfully setting seeds
  console.log("Posting new seeds...");
  res.status(200).redirect('/'); // WORKAROUND: refreshes the page
});

// 404 handler
app.use('*', (req,res) => {
  res.status(404).send('Not Found');
});

// Global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});
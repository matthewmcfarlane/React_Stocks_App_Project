const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('.helpers/create_router');
const cors = require('cors');

app.use(cors());
app.use(express.json());

MongoClient.connect('mongodb://localhost:27017', {useUnifiedTopology: true})
.then((client) => {
    const db = client.db('portfolio');
    const stocksCollection = db.collection('stocks');
    const stocksRouter = createRouter(stocksCollection);
    app.use('/api/stocks', stocksRouter);
})
.catch(console.error)

app.listen(5000, function(){
    console.log(`Listening on port ${ this.address().port }`);
});
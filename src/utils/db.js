const MongoClient = require('mongodb').MongoClient;
const config = require('./config');

// Create a connection URL
const url = 'mongodb://localhost:27017/docdb-2023-12-20-13-32-34.cluster-cqaqbi2efhui.us-east-1.docdb.amazonaws.com;


// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to the server
client.connect((err) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }

  console.log('Connected to MongoDB');

  // Use the client to perform database operations
  const db = client.db('yourDatabaseName'); // Replace 'yourDatabaseName' with your actual database name

  // Assuming you have a collection named 'yourCollectionName'
  const collection = db.collection('yourCollectionName');

  // Example query with map operation
  collection.find({ /* Your query criteria */ }).toArray((err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return;
    }

    // Perform a map operation on the result
    const mappedResult = result.map(item => {
      // Your map logic here
      return {
        /* Transform the item as needed */
      };
    });

    // Log the mapped result
    console.log(mappedResult);

    // Close the connection when done
    client.close();
  });
});


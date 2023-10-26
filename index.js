const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // to sharing data to client browser and server
app.use(express.json()); // this is used to receive body data

// halimzoomit
// 65zm9RYIMzQVMBP4



const uri = "mongodb+srv://halimzoomit:65zm9RYIMzQVMBP4@cluster0.robds1t.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

      // database connection
      const database = client.db("usersDB");
      const userCollection = database.collection("users");

    // POST API
    app.post('/users', async(req, res)=>{
        const user = req.body;
        console.log('new user : ', user);
        // Insert data into  collection
        const result = await userCollection.insertOne(user);
        res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);


app.get('/', (req, res)=>{
    res.send('Simple crud Server');
})

app.listen(port,()=>{
    console.log(`Simple crud server is running at: http://localhost:${port}`);
})


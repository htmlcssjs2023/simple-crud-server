const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
    //   const database = client.db("usersDB");
    //   const userCollection = database.collection("users");

    const userCollection = client.db("usersDB").collection("users");

    //get data, Read data = R
    app.get('/users', async(req, res)=>{
        const cursor = userCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    // update get
    app.get('/users/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const user = await userCollection.findOne(query);
      res.send(user);
    })

    // update information
    app.put('/users/:id', async(req, res)=>{
      const id = req.params.id;
      const user = req.body;
      // console.log(user);

      // Save data into database
      const filter ={_id: new ObjectId(id)}
      const options = {upsert:true};
      const updatedUser = {
        $set:{
          name:user.name,
          email:user.email
        }
      }

      const result = await userCollection.updateOne(filter, updatedUser, options);
      res.send(result);
    })

    // POST API - Create data = C
    app.post('/users', async(req, res)=>{
        const user = req.body;
        console.log('new user : ', user);
        // Insert data into  collection
        const result = await userCollection.insertOne(user);
        res.send(result);
    })

    // Delete data from database
    app.delete('/users/:id', async(req, res)=>{
        const id = req.params.id;
        console.log(id);
        const query = {_id: new ObjectId(id)}
        const result = await userCollection.deleteOne(query);
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


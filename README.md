### Create server
- Create folder 
$ mkdir simple-crud-server
- Go inside project folder using following command
cd simple-crud-server

- Create package.json file using following command
npm init -y
-Install express js follwing command
$ npm install express

- Install nodemon cors
=== nodemon is used to see the live change code result.
=== cors is used to pass data through client and server side.

- config nodemon in package.json 
"start": "nodemon index.js"

- Define cors and express.json() as middleware in index.js file
== app.use(cors());
== app.use(express.json());

### Define port
```JavaScript
    const port = process.env.PORT || 5000;
```
### set server listener 
```JavaScript
app.listen(port,()=>{
    console.log(`Simple crud server is running at: http://localhost:${port}`);
})

```
### require middlewares and define middleware
```JavaScript
    // Middleware
    app.use(cors()); // to sharing data to client browser and server
    app.use(express.json()); // this is used to receive body data
```

## Database configuration and send data into MongoDB Database
```JavaScript
- https://www.mongodb.com/docs/drivers/node/current/usage-examples/insertOne/
const { MongoClient, ServerApiVersion } = require('mongodb');
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

```
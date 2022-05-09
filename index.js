const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middlewire 
app.use(cors());
app.use(express.json());


// user: dbuser1
// password: bYwZDiGaQiMl80Ni



const uri = "mongodb+srv://dbuser1:bYwZDiGaQiMl80Ni@cluster0.h7ggo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
        await client.connect();
        const userCollection = client.db("laptopsource").collection("user");
        const user = { name: "Abdul", email: 'abdul@gmail.com' }
        const result = await userCollection.insertOne(user);
        console.log(`user inserted with id: ${result.insertedId} `);
    }
    finally{
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('Running sevver');
});


app.listen(port,()=>{
    console.log('Listening to port ', port);
});
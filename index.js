const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middlewire 
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h7ggo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {

    }
    finally {
        await client.connect();
        const serviceCollection = client.db('laptopSource').collection('service');

        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })


        app.get('/service/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const service = await serviceCollection.findOne(query);
            res.send(service);
        })


        // post addService
        app.post('/service', async(req,res)=>{
           
            const newService = req.body;
            const result = await serviceCollection.insertOne(newService);
            res.send(result);
        })


        // delete 
        app.delete('/service/:id', async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await serviceCollection.deleteOne(query);
            res.send(result);
        })



         // put / update user / stock increased / react hook form
         app.put('/service/:id', async(req,res)=>{
            const id = req.params.id;
            const updatedStock = req.body;
            const filter = {_id: ObjectId(id)};
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    stock: updatedStock.stock
                    
                }
            };
            const result = await serviceCollection.updateOne(filter,updatedDoc, options);
            res.send(result);
        })



    }
}
run().catch(console.dir);





app.get('/', (req, res) => {
    res.send('Running sevver');
});


app.listen(port, () => {
    console.log('Listening to port ', port);
});
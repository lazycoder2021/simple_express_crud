const express = require('express');
const app = express(); 
const bodyParser = require('body-parser'); 


const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId; 

const client = new MongoClient('mongodb://127.0.0.1:27017/cricketDB');

async function connectDB() {
    //const client = new MongoClient('mongodb://localhost:27017/cricketDB');
    client.connect(); 
    console.log('db connected....')
}

connectDB()

app.use(express.static('public'));
app.use(bodyParser());
app.use(express.urlencoded({ extended: false }));


app.post('/addplayer', async function (req, res) {
    try {
        client.connect();

        const database = await client.db('cricketDB');
        const players = await database.collection('players');
        console.log('player collection created successfully')

        const response = await players.insertOne({
            name: req.body.name,
            age: req.body.age,
            role: req.body.role,
            isCaptain: false
        })

        console.log(response)

        client.close();

        res.send('player created successfully')
    } catch (e) {
        console.log(e)
    }
})

app.get('/getplayers', async function (req, res) {
    try { 
        let list=[]; 
        client.connect();

        const database = await client.db('cricketDB');
        const players = await database.collection('players');

        const response = await players.find({});

        

        console.log(response)

       await response.forEach((r) => {
            console.log(r)
            list.push(r)
            console.log(list)
            //console.log(list)
        })

        console.log(list)

        /*
         players = response.forEach((r) => {
            console.log(r)
            //return r;
        })
        */

        res.status(200).json({ "msg": list })
    } catch (e) {
        console.log(e)
    }
})



app.get('/getplayer/:id', async (req, res) => {
    try {
        client.connect();
        console.log(req.params.id)
        const covertingStringToObjectId = new ObjectId(req.params.id);
        const database = await client.db('cricketDB');
        const players = await database.collection('players');

        const response = await players.findOne({ _id: covertingStringToObjectId })
        console.log(response)
        res.status(200).json({ "msg": "record fetched successfully", response })
    } catch (e) {
        console.log(e)
    }
})

app.put('/updateplayer/:id', async (req, res) => {
    try {
        console.log(req.body)
        client.connect(); 
        const database = await client.db('cricketDB'); 
        const players = await database.collection('players'); 
        const covertingStringToObjectId = new ObjectId(req.params.id);

        const response = await players.updateOne({ _id: covertingStringToObjectId }, { $set: {name: req.body.name, age:req.body.age, role:req.body.role}})

        res.status(200).json({"msg": "record updated successfully", response})

    } catch (e) {
        console.log(e)
    }
})


app.delete('/deleteplayer/:id', async (req, res) => {
    try {
        client.connect(); 
        console.log(req.params.id)
        const covertingStringToObjectId = new ObjectId(req.params.id);
        const database = await client.db('cricketDB');
        const players = await database.collection('players');

        const response = await players.deleteOne({ _id: covertingStringToObjectId })
        console.log(response)
        res.status(200).json({"msg": "record deleted successfully"})
    } catch (e) {
        console.log(e)
    }
})

//insertPlayer()

//updatePlayer()

//getPlayers()

//getPlayer()

//deletePlayer()



//** to be written -- findPlayer() && deletePlayer() -- then try connecting to a frontend

/*

async function insertPlayer() {
    
    try {
        client.connect();

        const database = await client.db('cricketDB');
        const players = await database.collection('players');
        console.log('player collection created successfully')

        const response = await players.insertOne({
            name: 'Mike Holding',
            age: 22,
            role: 'bowler',
            isCaptain: true
        })

        console.log(response)
    } catch (e) {
        console.log(e)
        client.close()
    }
    

}

*/

/*

async function updatePlayer() {
    await client.connect(); 
    const database = await client.db('cricketDB');
    const players = await database.collection('players');
    const response = await players.updateOne({ name: 'Mike Gatting' }, { $set: {name: 'Mark Ramprakash'}})

    console.log(response)
    client.close()
}

*/

/*
async function getPlayers() {
    //console.log('success...')
    client.connect(); 

    const database = await client.db('cricketDB');
    const players = await database.collection('players');

    const response = await players.find({}); 

    response.forEach((r) => {
        console.log(r)
    })
}

*/

/*

async function getPlayer() {
    try {
        const database = await client.db('cricketDB');
        const players = await database.collection('players'); 

        const response = await players.findOne({ name: 'Mark Ramprakash' })

        console.log(response)

    } catch (e) {
        console.log(e)
    }
}

*/

/*
async function deletePlayer() {
    console.log('works....') 
    const response = await client.db('cricketDB').collection('players').deleteOne({ name: 'Mark Ramprakash' })
    console.log(response)
}

*/





app.listen('3000', function () {
    console.log('server up and running')
})






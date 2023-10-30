const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://allahinkulu:456852@cluster.ftbdzpb.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

const databaseName = "database"; 
const collectionName = "phonebook"; 

let db;

const connectDB = async () => {
    if (db) return;

    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    db = client.db(databaseName);
};

const getAllPersons = async () => {
    const collection = db.collection(collectionName);
    return await collection.find().toArray();
};

const getPerson = async (id) => {
    const collection = db.collection(collectionName);
    return await collection.findOne({ _id: ObjectId(id) });
};


const createPerson = async (person) => {
    const collection = db.collection(collectionName);
    return await collection.insertOne(person);
};

connectDB().catch(console.error);

module.exports = { getAllPersons, getPerson, createPerson };
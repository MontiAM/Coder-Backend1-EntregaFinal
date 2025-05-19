import mongoose from "mongoose";
class MongoDBSingleton {
    constructor() {
        if (MongoDBSingleton.instance) {
            return MongoDBSingleton.instance;
        }
        const MONGO_USR = process.env.MONGO_USR;
        const MONGO_PASS = process.env.MONGO_PASS;
        const mongoDB = process.env.MONGO_DB;

        this.url = `mongodb+srv://${MONGO_USR}:${MONGO_PASS}@cluster0.jffmlhp.mongodb.net/${mongoDB}?retryWrites=true&w=majority&appName=Cluster0`;
        this.isConnected = false;

        MongoDBSingleton.instance = this;
    }

    async connect() {
        if (this.isConnected) {
            console.log("Usando conexión existente a MongoDB");
            return;
        }
        try {
            await mongoose.connect(this.url);
            this.isConnected = true;
            console.log("Connected to database MongoDB Atlas");
        } catch (error) {
            console.log("Error connecting to the database MongoDB Atlas");
        }
    }

    getMongoose() {
        return mongoose;
    }
}

const mongoInstance = new MongoDBSingleton();
export default mongoInstance;

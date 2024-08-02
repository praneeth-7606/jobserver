import mongoose from "mongoose";

const database = async () => {
    try {
        const conn = await mongoose.connect('mongodb://mynewuser:number1234@cluster0-shard-00-00.dzro3qd.mongodb.net:27017,cluster0-shard-00-01.dzro3qd.mongodb.net:27017,cluster0-shard-00-02.dzro3qd.mongodb.net:27017/?ssl=true&replicaSet=atlas-xyz-shard-0&authSource=admin&retryWrites=true&w=majority');
        console.log(`connected to mongodb database`);
    } catch (error) {
        console.log(`error in mongodb ${error}`);
    }
};

export default database;

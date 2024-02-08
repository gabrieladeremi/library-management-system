const mongoose = require('mongoose');

const db = mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
    console.log("Mongo Db Failed on Connect: ERROR", err);
});

mongoose.connection.on("open", (connected) => {
    console.log("Mongo Db Connection Successful", connected);
});

const session = mongoose.connection.startSession();

module.exports = {
    db,
    session,
};
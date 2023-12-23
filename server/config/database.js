const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect( process.env.MONGODB_URL, { //'mongodb+srv://aasthatank:rWfF3T9bVK2u3hj7@studydesk.0iatnte.mongodb.net/StudyDesk'
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })
    .then(() => console.log("DB Connected Successfully"))
    .catch( (error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    })
};
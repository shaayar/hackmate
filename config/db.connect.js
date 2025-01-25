const { default: mongoose } = require("mongoose");
require('dotenv')

const connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        console.log(error)
    }
}

export default connect;
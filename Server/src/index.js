import connectDB from "../src/config/dbConnection.js";
import {app} from './server.js'
import 'dotenv/config'

connectDB()
.then(() =>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on  http://localhost:${process.env.PORT}`)
      })
})
.catch((error) =>{
    console.log("Mongodb connection is failed!!!",error);
})
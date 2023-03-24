import mongoose from "mongoose"



const connect =()=>{


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}${process.env.DB_HOST}/${process.env.DB_NAME}`)
.then(()=>{
    console.log(`[DB] is connected`)
}).catch(err=>{
    console.log(err)
})

}

export default connect
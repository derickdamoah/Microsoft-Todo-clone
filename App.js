import express from "express";
import {router} from "./routes/routes.js";

const app = express()

const port = 3000

app.use(express.static("public"))
app.use("/", router)

app.set('view engine', 'ejs')

app.listen(port, ()=>{
    console.log(`server listening on port ${port}`)
})

export {app}
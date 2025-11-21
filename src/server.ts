import app from "./app"
import { config } from "dotenv";
config();

const PORT = process.env.PORT || 7000;

app.listen(PORT,()=>{
    console.log(`RUNNING AT PORT ${PORT}`)
})
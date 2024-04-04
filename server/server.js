const express = require('express')
const cors = require('cors')
const authRouter = require('./resources/auth/auth.router')
const app = express();
PORT = 3000;  

app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(express.json())

//routes
app.use("/auth", authRouter)

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
})
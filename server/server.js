const express = require('express')
const cors = require('cors')
const authRouter = require('./resources/auth/auth.router')
const fetchProducts = require('./resources/fetch/fetch.router')
const app = express();
PORT = 3000;  

app.use(cors())
app.use(express.json())

//routes
app.use("/auth", authRouter)
app.use("/fetch", fetchProducts)

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
})
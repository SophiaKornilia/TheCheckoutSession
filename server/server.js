const express = require('express')
const cors = require('cors')
const authRouter = require('./resources/auth/auth.router')
const fetchProducts = require('./resources/fetch/fetch.router')
const cookieSession = require('cookie-session')
const app = express();
PORT = 3000;  

app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true
    }
))
app.use(express.json())
app.use(cookieSession({
    secret: "s3cr3tk3y",
    //kan använda expiers eller maxAge
    maxAge: 1000 * 60 * 60, //1h 1000 millisekunder 60 blir 1min * 60 blir 1h.
    // httpOnly: true, //cookien får bara skickas via http protokollet, är true by default så behövs inte.
}))

//routes
app.use("/auth", authRouter)
app.use("/fetch", fetchProducts)

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
})
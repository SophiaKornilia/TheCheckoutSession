const { response } = require('express');
const fetchUsers = require('../../utils/fetchUsers')
const bcrypt = require('bcrypt')
const fs = require('fs').promises
require('dotenv').config(); 
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);



const register = async (req, res) => {
    
  
    //här ska jag kunna registrera en ny användare.
  
    //vi hämtar användarinformationen 
    const {email, password, name} = req.body
    console.log(password);

    //kolla så att användaren inte redan finns. 
    const users = await fetchUsers()
    const userExists = users.find(u => u.email === email)

    if(userExists) {
        return res.status(400).json("User already exist, try to Log in")
    }

    //kryptera lösenordet
    const hashedPassword = await bcrypt.hash(password, 10 )

    //  skapa användare i Stripe
      const customer = await stripe.customers.create({
        name: name,
        email: email.toLowerCase()
    })
    
    //skapa i stripe först och spara ner kundid. 

   
    //spara till databasen
    const newUser = {
        name,
        email, 
        password: hashedPassword,
        customerId: customer.id
    }
    
    users.push(newUser); 

    
    await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2))

    //skicka tillbaka ett svar
    res.status(201).json({newUser})
    console.log(newUser);
}

const login = async (req, res) => {
    //kolla med joi

    //kolla så att användarn finns 
    const {email, password} = req.body

    const users = await fetchUsers()
    const userExists = users.find(u => u.email === email)

    //kolla så att lösenordet stämmer och användaren finns
    if(!userExists || ! await bcrypt.compare(password, userExists.password)) {
        return res.status(400).json("Wrong user or password")
    }

    //skapa en session, lösenordet matchar och användaren finns. 
    req.session.user = userExists


    //skicka tillbaka ett svar
    res.status(200).json(`Du är inloggad med mail ${userExists.email}`)
}

//här kollar vi om det finns en user i session vilket betyder att någon är inloggad. 

const isLoggedIn = (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    res.status(200).json(req.session.user)
  
}

const logout = (req, res) => {
    req.session = null
    res.status(200).json("Successfully logged out")
}

module.exports = {register, login, isLoggedIn, isLoggedIn, logout}
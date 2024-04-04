const fetchUsers = require('../../utils/fetchUsers')
const bcrypt = require('bcrypt')
const fs = require('fs').promises
const stripe = require('stripe')(process.env.STRIPE_KEY);

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
      const customer = await stripe.customer.create({
        name: "namn",
        email:"email"
    })
    
    //skapa i stripe först och spara ner kundid. 

    //spara till databasen
    const newUser = {
        name,
        email, 
        password: hashedPassword
    }
    
    users.push(newUser); 

    
    await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2))

    //skicka tillbaka ett svar
    res.status(201).json({newUser})
    console.log(newUser);

}

module.exports = {register}
const express = require("express")
const path = require("path")
const app = express()
// const hbs = require("hbs")
const LogInCollection = require("./mongo")
const port = process.env.PORT || 3000
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../tempelates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))


// hbs.registerPartials(partialPath)


app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('login')
})
app.get('/home', (req, res) => {
    res.render('home'); 
});

app.get('/booktickets', (req, res) => {
    res.render('booktickets'); 
});

app.get('/recent', (req, res) => {
    res.render('recent'); 
});

app.get('/upcoming', (req, res) => {
    res.render('upcoming'); 
});

app.get('/teamstandings', (req, res) => {
    res.render('teamstandings'); 
});

app.get('/bt', (req, res) => {
    res.render('bt'); 
});

app.get('/tnc', (req, res) => {
    res.render('tnc'); // Assuming you have a recent.hbs or recent.handlebars file in the "templates" directory
});
// app.get('/home', (req, res) => {
//     res.render('home')
// })

app.post('/signup', async (req, res) => {
    const data = {
        name: req.body.name,
        password: req.body.password
    }

    try {
        const checking = await LogInCollection.findOne({ name: req.body.name })

        if (checking) {
            if (checking.password === req.body.password) {
                res.send("User details already exist.")
            } else {
                res.send("Incorrect password.")
            }
        } else {
            await LogInCollection.insertMany([data])
            res.status(201).render("home", {
                naming: req.body.name
            })
        }
    } catch (error) {
        console.error(error)
        res.status(500).send("Internal server error.")
    }
})



app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` })
        }

        else {
            res.send("incorrect password")
        }


    } 
    
    catch (e) {

        res.send("wrong details")
        

    }


})



app.listen(3000, () => {
    console.log('port connected');
})
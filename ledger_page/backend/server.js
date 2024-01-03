
// environment vars
require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const personRoutes = require("./routes/person")
const authRoutes = require("./routes/auth")
const dataRoutes = require("./routes/data")
const bodyParser = require('body-parser');

const session = require('express-session');
const passport = require("passport");

const cors = require('cors');

// express app
const app = express()
app.use(bodyParser.json({ limit: '50mb' }));

// If you are also parsing URL-encoded bodies (like form data)
// you may want to increase the limit for this as well
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// middleware
app.use(express.json()) // to get req body

app.use(cors({
  origin: `${process.env.REACT_APP_SERVER_ADD}`,
  credentials: true
}));

app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // days hours minutes seconds milli
  },
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.method, req.path)
  next()
})

//routes
app.use("/auth", authRoutes)
app.use("/api/person", personRoutes)
app.use("/api/data", dataRoutes)



// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to DB and listening on the port " + process.env.PORT);
    })
  })
  .catch((err) => {
    console.log(err);
  })


// listening on port 


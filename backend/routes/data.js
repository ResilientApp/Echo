const express = require("express")
const router = express.Router()



const { 
  
  face
} = require("../controllers/dataController")


//login route



router.post("/face", face)




module.exports = router
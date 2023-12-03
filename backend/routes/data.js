const express = require("express")
const router = express.Router()



const { 
  postdata,
  postdataDriver,
  face
} = require("../controllers/dataController")


//login route

router.post("/", postdata) // to do a regular map

router.post("/driver", postdataDriver)

router.post("/face", face)




module.exports = router
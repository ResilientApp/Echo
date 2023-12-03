require("dotenv").config()
const bodyParser = require('body-parser');

var request = require('request');
var rp = require('request-promise-native'); // Corrected import
const _apiUrl = 'https://faceapi.mxface.ai/api/v3/face/';
const _subscriptionKey = process.env.SUBSCRIPTION_KEY;//change subscription key / Key entered for Zachary Willson's account

async function base64EncodeFromUrl(url) {
  try {
    let imageBuffer = await rp({ // Using rp instead of requestPromise
      url: url,
      encoding: null
    });
    return imageBuffer.toString('base64');
  } catch (error) {
    console.error('Error downloading or encoding image:', error);
    return null;
  }
}


var fs = require('fs');
function base64Encode(file) {
  var body = fs.readFileSync(file);
  return body.toString('base64');
}


function getRequestOption(api, encodedImage) {
  var options = {
    url: _apiUrl + api,
    method: 'POST',
    headers: {
      'subscriptionkey': _subscriptionKey,
      'Content-Type': 'application/json'
    },
    json: {
      encoded_image: encodedImage
    },
    rejectUnauthorized: false,
  };
  return options
}

function sendRequest(api, encodedImage) {
  request(getRequestOption(api, encodedImage), function (error, response) {
    if (error) {
      console.log(error)
    }
    else {
      console.log("Response /" + api);
      if (response.statusCode == 200) {
        console.log(response.body);
        var faces = response.body.faces; // Assuming faces is an array within response.body

        if (Array.isArray(faces)) {
          for (var face of faces) {
            console.log("Face Quality : " + face.quality);
          }
        } else if (typeof faces === 'object') {
          // Handle the case where faces is an object instead of an array
          console.log("Face Quality : " + faces.quality);
        } else {
          console.log("Unexpected structure for faces");
        }
      } else {
        console.log("Error :");
        console.log(response.body);
      }
    }
  });
}







const postdata = async (req, res) => {
  const appId = process.env.APPID;
  const hashToken = process.env.HASHTOKEN;
  const tokenUrl = `https://api.iq.inrix.com/auth/v1/appToken?appId=${appId}&hashToken=${hashToken}`;

  const { start, end } = req.body; // Extracting start and end from request body

  try {
    const tokenResponse = await fetch(tokenUrl);
    if (!tokenResponse.ok) {
      throw new Error('Failed to fetch token');
    }

    const tokenData = await tokenResponse.json();
    const appToken = tokenData.result.token;

    const routeUrl = `https://api.iq.inrix.com/findRoute?wp_1=${start.lat},${start.lng}&wp_2=${end.lat},${end.lng}&routeOutputFields=B%2CM%2CP%2CS%2CW&format=json`;


    const routeResponse = await fetch(routeUrl, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${appToken}`
      }
    });

    if (!routeResponse.ok) {
      throw new Error('Failed to fetch route information');
    }

    const routeData = await routeResponse.json();
    res.json(routeData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const postdataDriver = async (req, res) => {
  const appId = process.env.APPID;
  const hashToken = process.env.HASHTOKEN;
  const tokenUrl = `https://api.iq.inrix.com/auth/v1/appToken?appId=${appId}&hashToken=${hashToken}`;

  const { userStart, userEnd, passengerStart, passengerEnd } = req.body;

  try {
    const tokenResponse = await fetch(tokenUrl);
    if (!tokenResponse.ok) {
      throw new Error('Failed to fetch token');
    }

    const tokenData = await tokenResponse.json();
    const appToken = tokenData.result.token;

    const routeUrl = `https://api.iq.inrix.com/findRoute?wp_1=${userStart.lat},${userStart.lng}&wp_2=${passengerStart.lat},${passengerStart.lng}&wp_3=${passengerEnd.lat},${passengerEnd.lng}&wp_4=${userEnd.lat},${userEnd.lng}&routeOutputFields=B%2CM%2CP%2CS%2CW&format=json`;


    const routeResponse = await fetch(routeUrl, {
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${appToken}`
      }
    });

    if (!routeResponse.ok) {
      throw new Error('Failed to fetch route information');
    }

    const routeData = await routeResponse.json();
    res.json(routeData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




const face = async (req, res) => {

  const { username, image } = req.body;
  console.log(req)
  console.log(username)
  console.log("image",image)
  var base64SingleFace = await image;
  var base64MultipleFace = await base64EncodeFromUrl(`https://ucdavis189fecho.s3.us-west-1.amazonaws.com/${username}.jpg`);
  
  sendRequest("detect", base64MultipleFace)
  //console.log("detected")
  sendRequest("analytics", base64SingleFace)
  //console.log("analytics")
  sendRequest("landmark", base64SingleFace)
 //console.log("landmark")


  var optionsFaceCompare = {
    url: _apiUrl + 'verify',
    method: 'POST',
    headers: {
      'subscriptionkey': _subscriptionKey,
      'Content-Type': 'application/json'
    },
    json: {
      encoded_image1: base64SingleFace,
      encoded_image2: base64MultipleFace
    },
    rejectUnauthorized: false,
  };

  request(optionsFaceCompare, function (error, response) {
    console.log("Response /verify");
    if (error) {
      console.log(error)
    }
    else {
      console.log(response.body)
      res.json(response.body);
    }
  });


}

module.exports = {
  postdata,
  postdataDriver,
  face
};

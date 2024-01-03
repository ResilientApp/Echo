require("dotenv").config()
const bodyParser = require('body-parser');

const AWS = require('aws-sdk');

// Configure the AWS region and credentials
AWS.config.update({
  region: process.env.AWS_REGION, // Change to your bucket's region
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

var request = require('request');
var rp = require('request-promise-native'); // Corrected import
const _apiUrl = 'https://faceapi.mxface.ai/api/v3/face/';
const _subscriptionKey = process.env.SUBSCRIPTION_KEY;//change subscription key / Key entered for Zachary Willson's account

const s3 = new AWS.S3();

async function getSignedUrl(bucketName, objectKey) {
  try {
    const url = s3.getSignedUrl('getObject', {
      Bucket: bucketName,
      Key: objectKey,
      Expires: 60 * 5, // URL expires in 5 minutes
    });
    console.log(url)
    return url;
  } catch (error) {
    console.error('Error generating signed URL:', error);
    return null;
  }
}

async function base64EncodeFromUrl(url) {
  try {
    let imageBuffer = await rp({ // Using rp instead of requestPromise
      url: url,
      encoding: null
    });
    console.log(imageBuffer.toString('base64'))
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

const face = async (req, res) => {

  const { username, image } = req.body;
  console.log("image", image);
  console.log("username",username)
  const userImageKey = `${username}`; // Adjust as needed based on how you store user images
  console.log("USERIMAGEKEY", userImageKey)
  const signedUrl = await getSignedUrl('echo-be', userImageKey); // Replace 'echo-be' with your actual bucket name

  const base64SingleFace = image; // The image from the client
  const base64MultipleFace = await base64EncodeFromUrl(signedUrl); // Fetch and encode the image from S3

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
  face
};

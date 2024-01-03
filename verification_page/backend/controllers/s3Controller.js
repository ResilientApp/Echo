const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

// Configure AWS with your access and secret key.
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// Set up multer to upload to S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'echo-be',
    key: function (req, file, cb) {
      const filename = `${file.originalname}`;
      cb(null, filename);
    }
  })
});



// Controller for file upload
const uploadFile = [
  // Handle multiple fields: 'file' for the file and 'userId' for the user identifier
  upload.fields([{ name: 'file', maxCount: 1 }, { name: 'userId', maxCount: 1 }]),

  (req, res) => {
    if (!req.files || !req.files.file) {
      return res.status(400).send('No file uploaded');
    }

    // Assuming 'file' is the key for the uploaded file
    const uploadedFile = req.files.file[0];

    // File is successfully uploaded
    res.status(201).send({ message: 'File uploaded', location: uploadedFile.location });
  }
];


module.exports = {
  uploadFile
};

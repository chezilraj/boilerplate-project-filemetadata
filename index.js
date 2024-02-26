var express = require('express');
var app = express();
var cors = require('cors');
require('dotenv').config()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const multer = require('multer');
const path = require('path');



app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder where files will be uploaded
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Set the filename for the uploaded file
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Initialize multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 } // Set file size limit (in bytes)
});

// Define a route to handle file uploads
app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  // 'file' in upload.single('file') is the name attribute of the file input field in the HTML form

  // If file uploaded successfully, send a response
	//res.send('File uploaded');
	var upfile = req.file;
  res.json({ name: upfile.originalname, type: upfile.mimetype, size: upfile.size })
});




const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});

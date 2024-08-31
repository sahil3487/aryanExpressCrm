const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder where files will be uploaded
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


exports.uploadDocuments = upload.fields([
    { name: 'aadharDocument', maxCount: 1 },
    { name: 'panCardDocument', maxCount: 1 }
  ]);
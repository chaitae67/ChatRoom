const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadimage, postImage } = require('../controllers/uploadController');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route('/').get(uploadimage);
router.route('/upload').post(upload.single('image'), postImage);

module.exports = router;
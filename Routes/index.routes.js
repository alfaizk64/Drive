const express = require('express');
const { home_page, fileUpload } = require('../Controllers/index.controller');
const authenticatemiddleware = require('../middlewares/auth');
const router = express.Router()

router.get('/home',authenticatemiddleware,home_page)

router.post('/upload-file',authenticatemiddleware ,fileUpload)


  



module.exports = router;
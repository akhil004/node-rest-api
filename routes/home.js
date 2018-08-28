const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.render('index',{title : "My Express Application",message: "Hello Akhiles"});
});

module.exports = router;
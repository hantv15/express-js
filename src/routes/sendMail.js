const sendMailContr = require('../controllers/sendMailController');

const router = require('express').Router();


// send mail

router.post("/send-mail", sendMailContr.sendMailUser);

module.exports = router;


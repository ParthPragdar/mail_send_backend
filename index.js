const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Route to send email
app.post('/send-email', (req, res) => { 
  const { from,to, subject, text ,appPassword} = req.body;


  // Create a Nodemailer transporter 
  const transporter = nodemailer.createTransport({
    service: 'Gmail',  
    auth: { 
      user: from, // Your Gmail email address
      pass: appPassword??'tqco jpxo mkdf umkz' // Your Gmail password or App Password
    }
  });

  // Email data 
  const mailOptions = {
    from: from, // Sender email
    to:to, // Recipient email
    subject: subject, 
    text: text
  }; 

  // Send email  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error); 
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
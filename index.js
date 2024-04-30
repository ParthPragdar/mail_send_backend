require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT;

// Middleware to parse JSON
app.use(bodyParser.json());

// Route to send email
app.post('/send-email', (req, res) => {
    const { from, to, subject, text, appPassword ,name} = req.body;

    if (!from || !to || !subject || !text || !appPassword || !name) {
        res.status(500).send('Please enter all required information {from, to, subject, text, appPassword }');
        return;
    }
    // console.log(`${appPassword} ${from} ${to} ${subject} ${text} ${name}`);
    // Create a Nodemailer transporter 
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: from, // Your Gmail email address
            pass: appPassword // Your Gmail password or App Password
        }
    });

    // Email data 
    const mailOptions = {
        from: `${name} <${from}>`, // Sender email
        to: to, // Recipient email
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
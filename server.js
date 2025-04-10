const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');  

const app = express();
const port = 5000;

// Enable CORS for all origins (you can specify specific domains if needed)
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// POST route for sending emails
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter object using SMTP settings
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like Outlook, SendGrid, etc.
    auth: {
      user: 'officialwep009@gmail.com', // Your email address
      pass: 'dvqh phud coys sake', // Your email password or app-specific password
    },
  });

  // Setup email data
  const mailOptions = {
    from: email, // Sender's email
    to: 'officialwep009@gmail.com', // Recipient's email
    subject: `Meeting Request from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: 'Failed to send email', error });
    }
    res.status(200).json({ message: 'Email sent successfully', info });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

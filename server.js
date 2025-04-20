// const express = require('express');
// const nodemailer = require('nodemailer');
// const bodyParser = require('body-parser');
// const cors = require('cors');  

// const app = express();
// const port = 5000;

// // Enable CORS for all origins (you can specify specific domains if needed)
// app.use(cors());

// // Middleware to parse incoming JSON requests
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // POST route for sending emails
// app.post('/send-email', (req, res) => {
//   const { name, email, message, date, time } = req.body;

//   if (!name || !email || !message || !date || !time) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   // Create a transporter object using SMTP settings
//   const transporter = nodemailer.createTransport({
//     service: 'gmail', // You can use other services like Outlook, SendGrid, etc.
//     auth: {
//       user: 'officialwep009@gmail.com', // Your email address
//       pass: 'dvqh phud coys sake', // Your email password or app-specific password
//     },
//   });

//   // Setup email data
//   const mailOptions = {
//     from: email, // Sender's email
//     to: 'officialwep009@gmail.com', // Recipient's email
//     subject: `Meeting Request from ${name}`,
//     text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
//   };

//   // Send email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       return res.status(500).json({ message: 'Failed to send email', error });
//     }
//     res.status(200).json({ message: 'Email sent successfully', info });
//   });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { name, email, message, date, time } = req.body;

  if (!name || !email || !message || !date || !time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'officialwep009@gmail.com',
      pass: 'dvqh phud coys sake',
    },
  });

  const mailOptions = {
    from: `"Consultation Booking" <officialwep009@gmail.com>`,
    to: 'officialwep009@gmail.com', 
    subject: 'New Free Consultation Request',
    html: `
      <h2>Consultation Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Preferred Date:</strong> ${date}</p>
      <p><strong>Preferred Time:</strong> ${time}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).json({ error: 'Email sending failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

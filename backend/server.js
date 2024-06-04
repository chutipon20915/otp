const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
// const secret = "Fullstack-Login";
// const jwt = require("jsonwebtoken");
const PORT = 5000;
const nodemailer = require("nodemailer");
require('dotenv').config();

var app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: '123456789*',
  database: "otp_verification",
});

db.connect((error)=>{
    if(error){
    console.error('Error connecting to MySQL database:', error);
    }else{
    console.log('Connected to MySQL database!');
    }
    });

// Function to generate a 4-digit OTP
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Nodemailer transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  }
});

// Handle form submission and email verification
app.post('/submit', (req, res) => {
  const email = req.body.email;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      res.status(500).send('Database error');
      return;
    }

    if (results.length > 0) {
      // Email exists, generate OTP and send email
      const otp = generateOTP();
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          res.status(500).send('Error sending email');
          return;
        }

        // Store OTP in database
        db.query('UPDATE users SET otp = ? WHERE email = ?', [otp, email], (err, results) => {
          if (err) {
            console.error('Error updating MySQL:', err);
            res.status(500).send('Database error');
            return;
          }

          res.status(200).send('Email verified');
        });
      });
    } else {
      res.status(404).send('Email not found');
    }
  });
});

// Handle OTP verification
app.post('/verify', (req, res) => {
  const { email, otp } = req.body;

  db.query('SELECT * FROM users WHERE email = ? AND otp = ?', [email, otp], (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      res.status(500).send('Database error');
      return;
    }

    if (results.length > 0) {
      res.status(200).send('OTP verified');
    } else {
      res.status(400).send('Invalid OTP');
    }
  });
});



// // send mail
// app.post("/register",  (req, res) => {
//   db.query("SELECT * FROM users",  (err, results) =>{
//     const { email } = req.body;
//     try {
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: "chutiponct.tip@gmail.com",
//                 pass: "donut20915"
//             }
//         });

//         //write mail
//         const mailOptions = {
//             from: "chutiponct.tip@gmail.com",
//             to: email,
//             subject: "Sending Email With React And Nodejs",
//             html: '<h1>Congratulation</h1> <h1> You successfully sent Email </h2>'
//         };

//         //sent mail
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.log("Error" + error)
//             } else {
//                 console.log("Email sent:" + info.response);
//                 res.status(201).json({status:201,info})
//             }
//         })

//     } catch (error) {
//         console.log("Error" + error);
//         res.status(401).json({status:401,error})
//     }
// });
//   });


//   app.post("/login",  (req, res, next) => {
//       db.query( "SELECT * FROM otp WHERE email=?", [req.body.email], (err, data) =>{
//         if(err) return res.json("Error");
//         if(data.length > 0){
//           return res.json ("OK");
//         }
//         else{
//           return res.json ("NOT OK");
//         }
//       }
//     )
//   }
// );

    // //gennarate OTP
    // function generateOTP() {
    //   return Math.floor(100000 + Math.random() * 900000).toString();
    // }

    // //send OTP to Email
    // async function sendOTP(toEmail) {
    //   const otp = generateOTP();
    //   let transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: process.env.EMAIL_USER, // Your Gmail address
    //       pass: process.env.EMAIL_PASS  // Your Gmail password or App Password
    //     }
    //   });

    //   // Setup email data
    //   let mailOptions = {
    //     from: process.env.EMAIL_USER, // Sender address
    //     to: toEmail,                  // List of receivers
    //     subject: 'Your OTP Code',     // Subject line
    //     text: `Your OTP code is: ${otp}`, // Plain text body
    //     html: `<b>Your OTP code is: ${otp}</b>` // HTML body
    //   };

    //   // Send mail
    //   try {
    //     let info = await transporter.sendMail(mailOptions);
    //     console.log('Message sent: %s', info.messageId);
    //     return otp; // Return the OTP for verification purposes
    //   } catch (error) {
    //     console.error('Error sending email: ', error);
    //     throw error;
    //   }
    // }

    
//     const { email } = req.body;
//     try {
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: "chutiponct.tip@gmail.com",
//                 pass: "donut20915"
//             }
//         });

//         const mailOptions = {
//             from: "chutiponct.tip@gmail.com",
//             to: email,
//             subject: "Sending Email With React And Nodejs",
//             html: '<h1>Congratulation</h1> <h1> You successfully sent Email </h2>'
//         };

//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.log("Error" + error)
//             } else {
//                 console.log("Email sent:" + info.response);
//                 res.status(201).json({status:201,info})
//             }
//         })

//     } catch (error) {
//         console.log("Error" + error);
//         res.status(401).json({status:401,error})
//     }
// });

app.get("/users", function (req, res) {
  db.query("SELECT * FROM users",  (err, results) =>{
    return res.json(results);
  });
});

app.get("/name", function (req, res) {
  db.query("SELECT * FROM users WHERE name = 'Donut' ",  (err, results) =>{
    return res.json(results);
  });
});


app.listen(PORT, function () {
  console.log(`Listening Localhost port ${PORT}..`);
});

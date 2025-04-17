const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const nodemailer = require('nodemailer')
require('dotenv').config()

const app = express()
const PORT =  5000 ||  process.env.PORT

app.use(cors())
app.use(bodyparser.json())

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

app.post('/api/contact', (req, res)=> {
    const { name, email, phone, message } = req.body

    if(!name || !email || !phone  || !message){
        return res.status(400).json({error: 'All Fields are required'})

    }

    const adminHtml = `
    <div style="font-family : Arial, sans-serif; padding : 20px; color: #333">
    <h2> New Contact Form Submission</h2>
    <p><strong>Name: </strong> ${name}</p>
    <p><strong>Email: </strong> ${email}</p>
    <p><strong>Phone: </strong> ${phone}</p>
    <p><strong>Message: </strong></p>
    <p>${message}</p>
    </div>
    `;

const userHtml = `
<div  style="font-family : Arial, sans-serif; padding : 20px; color: #333;"> 
<h2> New contact form submission </h2>
<p> Dear ${name} </p>
<p> Thank you for contacting us </p>
`; 


const adminMailOptions = {
    from : email,
    to : process.env.EMAIL_USER,
    subject: `Uneeza ismail`,
    html: adminHtml
};

const userMailOptions = {
    from :  process.env.EMAIL_USER,
    to :  email,
    subject: `Thank you for contacting us`,
    html: userHtml,
}; 

transporter.sendMail(adminMailOptions, (error, info) => {
    if(error) {
        console.error('Error sending email to admin : ', error);
        return res.status(500).json({error : 'Failed to send email to admin'});
    }
    console.log('Admin email sent: ', info.response);

transporter.sendMail(userMailOptions, (error,info) => {
    if(error) {
        console.error('Error sending acknowledgement email to user : ', error);
        return res.status(500).json({error : 'Failed to send acknowledgement email'})
    }
    console.log('acknowledgement email sent: ', info.response);
    res.status(200).json({success : True , message : 'Email sent successfully!'})
});
});
})

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})

const express = require("express");
const router = express.Router();

//home route
router.get("/", (req, res)=>{
    res.render("general/home", {
        title: "Home Page"
    });
});

//contact us route
router.get("/contact-us", (req, res)=>{
    res.render("general/contactUs", {
        title: "Contact Page"
    });
});
//post: process the contact us form for when the user submit form
router.post("/contact-us", (req, res)=>{

    const { firstName, lastName, email, message } = req.body;
   
    // console.log(req.body); --test the body-parser is working
  
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
    const msg = {
        to: `jmzh119yjm@gmail.com`,
        from: `${email}`,
        subject: `Contact Us Form Submitted`,
        html: 
        `Vistor's Full Name: ${firstName} ${lastName}
         Vistor's Email Address: ${email}
         Vistor's Message: ${message}
        `
    };

    // Asynchronous operation (who don't know how long this will take to excute)
    sgMail.send(msg)
    .then(()=>{
        res.redirect("/");
    })
    .catch(err=>{
        console.log(`Error ${err}`);
    });   
});

module.exports = router;

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51Hlmg7FtRSQUe9Nk144nwQBkbgXNojY5t8MaGyQJ5V63BIb4sPNEYBCnK9j3Wdglj5FWChm1kZnPrD0yoqJNiqKm00LErz7yrd"
);

// API

// -App config
const app = express();

// -Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// -API Routes
app.get("/", (request, response) => response.status(200).send("Hello World"));
// app.get("/khalid", (request, response) =>
//   response.status(200).send("Whats Up Khalid")
// );


app.post("/payments/create", async (request, response) => {
    const total = request.query.total;
  
    console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // subunits of the currency
      currency: "usd",
    });
  
    // OK - Created
    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  });


// -Listen Command
exports.api = functions.https.onRequest(app);

//Example endpoint
// http://localhost:5001/e-challange-3fa74/us-central1/api

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

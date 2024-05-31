const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 4000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const nodemailer = require("nodemailer");

const getFbVideoInfo = require("fb-downloader-scrapper");

// Middlewere--------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Nodemailer transporter object
const transporter = nodemailer.createTransport({
  host: "mail.appslabbd.buzz",
  port: 465, //Outgoing Server SMTP port
  secure: true,
  auth: {
    user: "jishan@appslabbd.buzz",
    pass: "jishan155376@",
  },
});

app.get("/send-email", async (req, res) => {
  try {
    const to = "imranislamjishan80@gmail.com";
    const subject = "Test Email Hosting";
    const text = "Test Email Hosting";
    const html = `<p>Hello This is test email.</p>`;

    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Jishan Hossain" <jishan@appslabbd.buzz>',
      to,
      subject,
      text,
      html,
    });
    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ message: "Email sent successfully." });
  } catch (error) {
    console.error("Error occurred while sending email:", error);
    res
      .status(500)
      .json({ error: "Internal server error. Failed to send email." });
  }
});

app.get("/downloadFb", async (req, res) => {
  const { url } = req.params;

  getFbVideoInfo(url)
    .then((result) => {
      res.json({
        result,
      });
    })
    .catch((err) => {
      res.json({
        err,
      });
    });
});

app.get("/downloadYt", async (req, res) => {});

// // Mongodb Code Here--------------
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q1ppz51.mongodb.net/?retryWrites=true&w=majority`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     // await client.connect();
//     // Send a ping to confirm a successful connection
//     // await client.db("bongo_sports_db").command({ ping: 1 });

//     // Db Collection Code Here---------------------
//     const db = client.db("bongo_sports_db");

//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);

//Local Code here---------------
app.get("/", (req, res) => {
  res.send("Server is Running...");
});

app.listen(port, () => {
  console.log("App Running On Port");
});

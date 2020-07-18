const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
const app = express();

//Database Connection
connectDB();

//MiddleWare
app.use(express.json({ extended: false }));
app.use(cors());

// app.use("/", (req, res) => {
//   res.json({ msg: " This is node server" });
// });


//Defined Routes

//----------Authentication--------------
app.use("/api/auth", require("./routes/auth"));




// Serve static assets in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) =>
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//   );
// }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server Started on 5000"));

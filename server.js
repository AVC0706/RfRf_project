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

//----------User--------------
app.use("/api/user", require("./routes/user"));

//----------Admin--------------
app.use("/api/mandalAdmin", require("./routes/admin/mandalAdmin"));
app.use("/api/cityAdmin", require("./routes/admin/cityAdmin"));
app.use("/api/districtAdmin", require("./routes/admin/districtAdmin"));
app.use("/api/stateAdmin", require("./routes/admin/stateAdmin"));
app.use("/api/countryAdmin", require("./routes/admin"));
//----------Mandal-------------
app.use("/api/mandal", require("./routes/mandal"));

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

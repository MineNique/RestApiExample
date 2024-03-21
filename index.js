import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import routes from "./src/routes/crmRoutes.js"; // corrected path

const app = express();
const PORT = 3000;

// mongoose Connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/CRMdb");

// bodyparser Setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// Routes
app.get("/", (req, res) => {
	return res.status(200).send("REST API");
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));

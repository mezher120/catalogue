import express from "express"; // to create server
import dbConnect from "./db.js";  // import the fx to connect to db
import cors from 'cors';
import dotenv from 'dotenv'; // to use external environment for passwords
import furniture from './routes/furnitureRoute.js'
import furnitureBulk from './routes/furnitureBulkRoute.js'
import outstandings from './routes/outstandingsRoute.js'
import covers from './routes/coversRoute.js'
import colors from './routes/colorsRoute.js'

const app = express(); // create server 
dotenv.config(); // method to use dotenv

const PORT = process.env.PORT || 3002;  // port to assign to the server, in capital letters because is an environmental variable

app.use(express.json()); // to enable json posts
app.use(cors());
/*routes*/
app.use('/furniture', furniture)
app.use('/bulk', furnitureBulk);
app.use('/outstandings', outstandings);
app.use('/covers', covers);
app.use('/colors', colors);

dbConnect(); // initiate DB 

app.listen(PORT, () => console.log("server is active")) // initiate the server in port indicated
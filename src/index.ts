import bodyParser = require("body-parser");
import cors = require("cors");
import express = require("express");
import PaymentController from "./controller/PaymentController";

const app = express();
const port = process.env.PORT || 5000;

let controller = [
    new PaymentController(),
]
app.use(bodyParser.json())
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://ec01-08-payment.herokuapp.com"
    ]
}))
controller.forEach(x => app.use("/", x._router));

app.listen(port, () => {
    console.log(`[server]: Server is running at ${port}`);
});

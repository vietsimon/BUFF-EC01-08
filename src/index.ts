import bodyParser = require("body-parser");
import cors = require("cors");
import express = require("express");
import CategoriesAdminController from "./controller/admin/CategoriesAdminController";
import ColorAdminController from "./controller/admin/ColorAdminController";
import SizeAdminController from "./controller/admin/SizeAdminController";
import ProductAdminController from "./controller/admin/ProductAdminController";
import AuthorizeWebController from "./controller/web/AuthorizeWebController";
import PaymentWebController from "./controller/web/PaymentWebController";
import { BuffVnDataSourceInit } from "./dataSource";
import CategoriesWebController from "./controller/web/CategoriesWebController";
import ProductWebController from "./controller/web/ProductWebController";
import BlogCategoriesAdminController from "./controller/admin/BlogCategoriesAdminController";
import BlogCategoriesWebController from "./controller/web/BlogCategoriesWebController";
import BlogWebController from "./controller/web/BlogWebController";
import BlogAdminController from "./controller/admin/BlogAdminController";
import OrderWebController from "./controller/web/OrderWebController";
import OrderAdminController from "./controller/admin/OrderAdminController";
import CustomerAdminController from "./controller/admin/CustomerAdminController";
import LocationAdminController from "./controller/admin/LocationAdminController";
import UploadController from "./controller/UploadController";

const app = express();
const port = process.env.PORT || 5000;

let controller = [
    new PaymentWebController(),
    new AuthorizeWebController(),
    new BlogCategoriesWebController(),
    new CategoriesWebController(),
    new ProductWebController(),
    new BlogWebController(),
    new OrderWebController(),

    new SizeAdminController(),
    new CategoriesAdminController(),
    new ProductAdminController(),
    new ColorAdminController(),
    new BlogCategoriesAdminController(),
    new BlogAdminController(),
    new OrderAdminController(),
    new CustomerAdminController(),
    new LocationAdminController(),
    new UploadController()
]
app.use(bodyParser.json())
app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://ec01-08-payment.herokuapp.com"
    ]
}))
controller.forEach(x => app.use("/", x._router));
BuffVnDataSourceInit().then(x => {
    app.listen(port, () => {
        console.log(`[server]: Server is running at ${port}`);
    });
}).catch(err => {
    console.error(err);

})


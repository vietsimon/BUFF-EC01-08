import dayjs = require("dayjs");
import express = require("express");
import qs = require("qs");
import crypto = require("crypto");
import Common from "../ultils/common";
import BaseController from "./BaseController";
import PaymentConfig from "../shared/paymentConfig";

export default class PaymentController extends BaseController {
    constructor() {
        super();
        this.initializeRouter();
    }

    protected initializeRouter(): void {
        this._router.post("/payment/vn-pay/create-payment", this.createVnpayPayment)
    }

    private createVnpayPayment = async (request: express.Request, response: express.Response) => {
        let body: {
            productName: string,
            price: number,
            content: string
        } = request.body;
        
        if(!body.productName) return response.status(400).json({message : "Missing product name"})
        if(!body.price || body.price <= 0) return response.status(400).json({message : "price invalid"})

        var createDate = dayjs().format("YYYYMMDDHHmmss")
        let orderId = Math.round(Math.random() * 10000).toString()

        let vnp_Params = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: "FVPCHE3X",
            vnp_Locale: "vn",
            vnp_CurrCode: "VND",
            vnp_TxnRef: orderId,
            vnp_OrderInfo: body.content,
            vnp_OrderType: "billpayment",
            vnp_Amount: body.price * 100,
            vnp_CreateDate: createDate,
            vnp_ReturnUrl: "https://ec01-08-payment.herokuapp.com/payment/vnpay/return",
            vnp_IpAddr: request.socket.remoteAddress
        }

        vnp_Params = Common.SortObject(vnp_Params) as any;

        let signData = qs.stringify(vnp_Params, { encode: false })
        let hmac = crypto.createHmac("sha512", PaymentConfig.Vnpay.secretKey);
        let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
        vnp_Params['vnp_SecureHash'] = signed;
        let vnpUrl = PaymentConfig.Vnpay.vnPayUrl + '?' + qs.stringify(vnp_Params, { encode: false });
        response.json({ redirectUrl: vnpUrl })
    }
}
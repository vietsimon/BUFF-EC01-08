import dayjs = require("dayjs");
import express = require("express");
import qs = require("qs");
import crypto = require("crypto");
import PaymentConfig from "../../shared/paymentConfig";
import Common from "../../ultils/common";
import BaseController from "../BaseController";
import OrderService from "../../services/OrderService";

export default class PaymentWebController extends BaseController {
    constructor() {
        super();
        this.initializeRouter();
    }

    protected initializeRouter(): void {
        this._router.post("/payment/vn-pay/create-order-payment", this.createOrderPayment)
        this._router.post("/payment/vn-pay/create-payment", this.createVnpayPayment)
        this._router.post("/payment/payment/success", this.OrderPaymentSuccess)
        this._router.post("/payment/payment/cancel", this.OrderPaymentCancel)
    }
    private createOrderPayment = async (request: express.Request, response: express.Response) => {
        let body = request.body;
        let orderId = body?.orderId;
        let orderService = new OrderService();
        let orderDetail = await orderService.GetById(orderId);
        var createDate = dayjs().format("YYYYMMDDHHmmss")

        let currCode = body?.currencyCode;
        if (!currCode) currCode = "VND";

        let vnp_Params = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: "FVPCHE3X",
            vnp_Locale: "vn",
            vnp_CurrCode: currCode,
            vnp_TxnRef: orderId,
            vnp_OrderInfo: orderDetail.orderCode,
            vnp_OrderType: "billpayment",
            vnp_Amount: orderDetail.totalPrice*10,
            vnp_CreateDate: createDate,
            vnp_ReturnUrl: body.returnUrl,
            //vnp_ReturnUrl: "https://ec01-08-payment.herokuapp.com/payment/vnpay/return",
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

    private createVnpayPayment = async (request: express.Request, response: express.Response) => {

        let body: {
            productName: string,
            price: number,
            content: string
            currencyCode: string
            returnUrl: string
        } = request.body;

        if (!body.productName) return response.status(400).json({ message: "Missing product name" })
        if (!body.price || body.price <= 0) return response.status(400).json({ message: "price invalid" })

        var createDate = dayjs().format("YYYYMMDDHHmmss")
        let orderId = Math.round(Math.random() * 10000).toString()
        let currCode = body?.currencyCode;
        if (!currCode) currCode = "VND";
        let vnp_Params = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: "FVPCHE3X",
            vnp_Locale: "vn",
            vnp_CurrCode: currCode,
            vnp_TxnRef: orderId,
            vnp_OrderInfo: body.content,
            vnp_OrderType: "billpayment",
            vnp_Amount: body.price * 100,
            vnp_CreateDate: createDate,
            vnp_ReturnUrl: body.returnUrl,
            //vnp_ReturnUrl: "https://ec01-08-payment.herokuapp.com/payment/vnpay/return",
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

    private OrderPaymentSuccess = async (request: express.Request, response: express.Response) => {
        let data = request.body as any;
        try {
            let service = new OrderService();
            let dataService = await service.PaymentSuccess(data);
            if (dataService.status) {
                return response.status(200).json(dataService);
            }
            else return response.status(400).json({ errors: dataService.errors })
        } catch (error) {
            return response.status(500).json({
                error: error.message
            })
        }
    }

    private OrderPaymentCancel = async (request: express.Request, response: express.Response) => {
        let data = request.body as any;
        try {
            let service = new OrderService();
            let dataService = await service.PaymentCancel(data);
            if (dataService.status) {
                return response.status(200).json(dataService);
            }
            else return response.status(400).json({ errors: dataService.errors })
        } catch (error) {
            return response.status(500).json({
                error: error.message
            })
        }
    }
}
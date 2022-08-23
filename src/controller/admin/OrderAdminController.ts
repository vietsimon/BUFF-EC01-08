import express = require("express");
import OrderEntity from "../../entity/OrderEntity";
import OrderProductEntity from "../../entity/OrderProductEntity";
import ProductEntity from "../../entity/ProductEntity";
import SizeProductEntity from "../../entity/SizeProductEntity";
import AuthMiddleware from "../../middleware/auth";
import OrderProductService from "../../services/OrderProductService";
import OrderService from "../../services/OrderService";
import Common from "../../ultils/common";
import BaseController from "../BaseController"

export default class OrderAdminController extends BaseController {
    constructor() {
        super();
        this.initializeRouter();
    }
    protected initializeRouter(): void {
        this.initGetRouter();
        this.initPostRouter();
    }
    private initGetRouter() {
        this._router.get("/v1/admin/order", this.getOrderPaging);
        this._router.get("/v1/admin/order/:id", this.getOrderDetail);
    }
    private initPostRouter() {
        this._router.post("/v1/admin/order", AuthMiddleware.AuthCustomerJWT, this.createOrder);
        this._router.post("/v1/admin/order/status",  this.updateOrderStatus);
    }
    private getOrderPaging = async (request: express.Request, response: express.Response) => {
        try {
            let service = new OrderService();
            let dataService = await service.GetOrderPaging(request.query);
            if (dataService.status)
                return response.status(200).json(dataService.data);
            else return response.status(400).json({ errors: dataService.errors })
        } catch (error) {
            return response.status(500).json({
                error: error.message
            })
        }
    }

    private getOrderDetail = async (request: express.Request, response: express.Response) => {
        try {
            let { id } = request.params as any;

            let service = new OrderService();
            let dataService = await service.GetDetail(id);
            if (dataService.status)
                return response.status(200).json(dataService);
            else return response.status(400).json({ errors: dataService.errors })
        } catch (error) {
            return response.status(500).json({
                error: error.message
            })
        }
    }

    private createOrder = async (request: express.Request, response: express.Response) => {
        let data = request.body as any;
        try {
            let customer = request["auth"];
            data.guestId = customer?.id;
            data.orderCode = Common.randomId(8);
            data.status = 'new';
            let service = new OrderService();
            let dataService = await service.CreateOrder(data);
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

    private updateOrderStatus = async (request: express.Request, response: express.Response) => {
        let data = request.body as any;
        try {
            let service = new OrderService();
            let dataService = await service.UpdateOrderStatus(data);
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
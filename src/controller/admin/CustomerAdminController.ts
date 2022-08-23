import express = require("express");
import CustomerService from "../../services/CustomerService";
import BaseController from "../BaseController"

export default class CustomerAdminController extends BaseController {

    constructor() {
        super();
        this.initializeRouter();
    }
    protected initializeRouter(): void {
        this.initGetRouter();
        this.initPostPutDeleteRouter();
    }

    private initGetRouter() {
        this._router.get("/v1/admin/customer", this.getCustomerPaging);
        this._router.get("/v1/admin/customer/:id", this.getCustomerDetail);
    }
    private initPostPutDeleteRouter() {
        this._router.post("/v1/admin/customer", this.createCustomer);
        this._router.put("/v1/admin/customer", this.updateCustomer);
        this._router.delete("/v1/admin/customer/:id", this.deleteCustomer);
    }

    private getCustomerPaging = async (request: express.Request, response: express.Response) => {
        try {
            let service = new CustomerService();
            let dataService = await service.GetCustomerPaging(request.query);
            if (dataService.status)
                return response.status(200).json(dataService.data);
            else return response.status(400).json({ errors: dataService.errors })
        } catch (error) {
            return response.status(500).json({
                error: error.message
            })
        }
    }

    private getCustomerDetail = async (request: express.Request, response: express.Response) => {
        try {
            let { id } = request.params as any;
            let service = new CustomerService();
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
    private createCustomer = async (request: express.Request, response: express.Response) => {
        try {
            let { parentId } = request.body as any;
            if (!parentId) request.body["parentId"] = 0;
            let service = new CustomerService();
            let dataService = await service.CreateCustomer(request.body);
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

    private updateCustomer = async (request: express.Request, response: express.Response) => {
        try {
            let { parentId } = request.body as any;
            if (!parentId) request.body["parentId"] = 0;
            let service = new CustomerService();
            let dataService = await service.UpdateCustomer(request.body);
            if (dataService.status)
                return response.status(200).json(dataService);
            else return response.status(400).json({ errors: dataService.errors })
        } catch (error) {
            return response.status(500).json({
                error: error.message
            })
        }
    }

    private deleteCustomer = async (request: express.Request, response: express.Response) => {
        try {
            let { id } = request.params as any;
            let service = new CustomerService();
            let dataService = await service.DeleteCustomer(id);
            if (dataService.status)
                return response.status(200).json(dataService);
            else return response.status(400).json({ errors: dataService.errors })
        } catch (error) {
            return response.status(500).json({
                error: error.message
            })
        }
    }
}
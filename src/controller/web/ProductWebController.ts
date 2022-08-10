import express = require("express");
import ProductService from "../../services/ProductService";
import BaseController from "../BaseController"

export default class ProductWebController extends BaseController {
    constructor() {
        super();
        this.initializeRouter();
    }
    protected initializeRouter(): void {
        this.initGetRouter();
    }
    private initGetRouter() {
        this._router.get("/v1/web/product/lastest", this.getProductLastest);
        this._router.get("/v1/web/product", this.getProductPaging);
        this._router.get("/v1/web/product/:id", this.getProductDetail);
    }

    private getProductPaging = async (request: express.Request, response: express.Response) => {
        try {
            let service = new ProductService();
            let dataService = await service.GetPaging(request.query);
            if (dataService.status)
                return response.status(200).json(dataService.data);
            else return response.status(400).json({ errors: dataService.errors })
        } catch (error) {
            return response.status(500).json({
                error: error.message
            })
        }
    }

    private getProductDetail = async (request: express.Request, response: express.Response) => {
        try {
            let { id } = request.params as any;
            let service = new ProductService();
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

    private getProductLastest = async (request: express.Request, response: express.Response) => {
        try {
            let service = new ProductService();
            let dataService = await service.GetLastest(request.query);
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
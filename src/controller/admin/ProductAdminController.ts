import express = require("express");
import ProductService from "../../services/ProductService";
import BaseController from "../BaseController"

export default class ProductAdminController extends BaseController {
    constructor() {
        super();
        this.initializeRouter();
    }
    protected initializeRouter(): void {
        this.initGetRouter();
        this.initPostPutDeleteRouter();
    }
    private initGetRouter() {
        this._router.get("/v1/admin/product", this.getProductPaging);
        this._router.get("/v1/admin/product/:id", this.getProductDetail);
    }
    private initPostPutDeleteRouter() {
        this._router.post("/v1/admin/product", this.createProduct);
        this._router.put("/v1/admin/product", this.updateProduct);
        this._router.delete("/v1/admin/product/:id", this.deleteProduct);
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

    private createProduct = async (request: express.Request, response: express.Response) => {
        try {
            let service = new ProductService();
            let dataService = await service.Create(request.body);
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

    private updateProduct = async (request: express.Request, response: express.Response) => {
        try {
            let service = new ProductService();
            let dataService = await service.Update(request.body);
            if (dataService.status)
                return response.status(200).json(dataService);
            else return response.status(400).json({ errors: dataService.errors })
        } catch (error) {
            return response.status(500).json({
                error: error.message
            })
        }
    }

    private deleteProduct = async (request: express.Request, response: express.Response) => {
        try {
            let { id } = request.params as any;
            let service = new ProductService();
            let dataService = await service.Delete(id);
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
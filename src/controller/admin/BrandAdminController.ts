import express = require("express");
import BrandService from "../../services/BrandService";
import BaseController from "../BaseController"

export default class BrandAdminController extends BaseController {

    constructor() {
        super();
        this.initializeRouter();
    }
    protected initializeRouter(): void {
        this.initGetRouter();
        this.initPostPutDeleteRouter();
    }

    private initGetRouter() {
        this._router.get("/v1/admin/brand/all", this.getCategoryAll);
        this._router.get("/v1/admin/brand", this.getPaging);
        this._router.get("/v1/admin/brand/:id", this.getDetail);
    }
    private initPostPutDeleteRouter() {
        this._router.post("/v1/admin/brand", this.create);
        this._router.put("/v1/admin/brand", this.update);
        this._router.delete("/v1/admin/brand/:id", this.delete);
    }

    private getCategoryAll = async (request: express.Request, response: express.Response) => {
        try {
            let service = new BrandService();
            let dataService = await service.GetAll(request.query);
            if (dataService.status)
                return response.status(200).json(dataService);
            else return response.status(400).json({ errors: dataService.errors })
        } catch (error) {
            return response.status(500).json({
                error: error.message
            })
        }
    }

    private getPaging = async (request: express.Request, response: express.Response) => {
        try {
            let service = new BrandService();
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

    private getDetail = async (request: express.Request, response: express.Response) => {
        try {
            let { id } = request.params as any;
            let service = new BrandService();
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
    private create = async (request: express.Request, response: express.Response) => {
        try {
            let service = new BrandService();
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

    private update = async (request: express.Request, response: express.Response) => {
        try {
            let service = new BrandService();
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

    private delete = async (request: express.Request, response: express.Response) => {
        try {
            let { id } = request.params as any;
            let service = new BrandService();
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
import express = require("express");
import SizeService from "../../services/SizeProductService";
import BaseController from "../BaseController"

export default class SizeAdminController extends BaseController {
    constructor() {
        super();
        this.initializeRouter();
    }
    protected initializeRouter(): void {
        this.initGetRouter();
        this.initPostPutDeleteRouter();
    }
    private initGetRouter() {
        this._router.get("/v1/admin/size", this.getSizePaging);
        this._router.get("/v1/admin/size/all", this.getSizeAll);
        this._router.get("/v1/admin/size/:id", this.getSizeDetail);
    }
    private initPostPutDeleteRouter() {
        this._router.post("/v1/admin/size", this.createSize);
        this._router.put("/v1/admin/size", this.updateSize);
        this._router.delete("/v1/admin/size/:id", this.deleteSize);
    }

    private getSizeAll = async (request: express.Request, response: express.Response) => {
        try {
            let service = new SizeService();
            let dataService = await service.GetAll();
            if (dataService.status)
                return response.status(200).json(dataService);
            else return response.status(400).json({ errors: dataService.errors })
        } catch (error) {
            return response.status(500).json({
                error: error.message
            })
        }
    }

    private getSizePaging = async (request: express.Request, response: express.Response) => {
        try {
            let service = new SizeService();
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

    private getSizeDetail = async (request: express.Request, response: express.Response) => {
        try {
            let { id } = request.params as any;
            let service = new SizeService();
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

    private createSize = async (request: express.Request, response: express.Response) => {
        try {
            let service = new SizeService();
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

    private updateSize = async (request: express.Request, response: express.Response) => {
        try {
            let service = new SizeService();
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

    private deleteSize = async (request: express.Request, response: express.Response) => {
        try {
            let { id } = request.params as any;
            let service = new SizeService();
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
import express = require("express");
import ColorService from "../../services/ColorService";
import BaseController from "../BaseController"

export default class ColorAdminController extends BaseController {
    constructor() {
        super();
        this.initializeRouter();
    }
    protected initializeRouter(): void {
        this.initGetRouter();
        this.initPostPutDeleteRouter();
    }
    private initGetRouter() {
        this._router.get("/v1/admin/color", this.getColorPaging);
        this._router.get("/v1/admin/color/all", this.getColorAll);
        this._router.get("/v1/admin/color/:id", this.getColorDetail);
    }
    private initPostPutDeleteRouter() {
        this._router.post("/v1/admin/color", this.createColor);
        this._router.put("/v1/admin/color", this.updateColor);
        this._router.delete("/v1/admin/color/:id", this.deleteColor);
    }

    private getColorAll = async (request: express.Request, response: express.Response) => {
        try {
            let service = new ColorService();
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

    private getColorPaging = async (request: express.Request, response: express.Response) => {
        try {
            let service = new ColorService();
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

    private getColorDetail = async (request: express.Request, response: express.Response) => {
        try {
            let { id } = request.params as any;
            let service = new ColorService();
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

    private createColor = async (request: express.Request, response: express.Response) => {
        try {
            let service = new ColorService();
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

    private updateColor = async (request: express.Request, response: express.Response) => {
        try {
            let service = new ColorService();
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

    private deleteColor = async (request: express.Request, response: express.Response) => {
        try {
            let { id } = request.params as any;
            let service = new ColorService();
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
import express = require("express");
import CategoryService from "../../services/CategoryService";
import BaseController from "../BaseController"

export default class CategoriesWebController extends BaseController {

    constructor() {
        super();
        this.initializeRouter();
    }
    protected initializeRouter(): void {
        this.initGetRouter();
    }

    private initGetRouter() {
        this._router.get("/v1/web/categories/all", this.getCategoryAll);
        this._router.get("/v1/web/categories", this.getCategoryPaging);
        this._router.get("/v1/web/categories/:id", this.getCategoryDetail);
    }

    private getCategoryAll = async (request: express.Request, response: express.Response) => {
        try {
            let service = new CategoryService();
            let dataService = await service.GetAllCategory(request.query);
            if (dataService.status)
                return response.status(200).json(dataService);
            else return response.status(400).json({ errors: dataService.errors })
        } catch (error) {
            return response.status(500).json({
                error: error.message
            })
        }
    }

    private getCategoryPaging = async (request: express.Request, response: express.Response) => {
        try {
            let service = new CategoryService();
            let dataService = await service.GetCategoryPaging(request.query);
            if (dataService.status)
                return response.status(200).json(dataService.data);
            else return response.status(400).json({ errors: dataService.errors })
        } catch (error) {
            return response.status(500).json({
                error: error.message
            })
        }
    }

    private getCategoryDetail = async (request: express.Request, response: express.Response) => {
        try {
            let { id } = request.params as any;
            let service = new CategoryService();
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
}
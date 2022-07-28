import express = require("express");
import CategoryService from "../../services/CategoryService";
import BaseController from "../BaseController"

export default class CategoriesController extends BaseController {

    constructor() {
        super();
        this.initializeRouter();
    }
    protected initializeRouter(): void {
        this._router.get("/v1/admin/categories", this.getCategoryPaging);
        this._router.post("/v1/admin/categories", this.createCategory);
        this._router.put("/v1/admin/categories", this.updateCategory);
    }
    private getCategoryPaging = async (request: express.Request, response: express.Response) => {
        try {
            let { key } = request.body as any
            let service = new CategoryService();
            let dataService = await service.GetAllCategory();
            if (dataService.status) {
                return response.status(200).json(dataService.data);
            }
            else return response.status(400).json({ errors: dataService.errors })
        } catch (error) {
            return response.status(500).json({
                error: error.message
            })
        }
    }
    private createCategory = async (request: express.Request, response: express.Response) => {
        try {
            let { parentId } = request.body as any;
            if (!parentId) request.body["parentId"] = 0;
            let service = new CategoryService();
            let dataService = await service.CreateCategory(request.body);
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
    private updateCategory = async (request: express.Request, response: express.Response) => {
        try {   
            let { parentId } = request.body as any;
            if (!parentId) request.body["parentId"] = 0;
            let service = new CategoryService();
            let dataService = await service.UpdateCategory(request.body);
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
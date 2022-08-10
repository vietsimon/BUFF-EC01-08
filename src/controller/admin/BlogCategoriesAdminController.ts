import express = require("express");
import BlogCategoryService from "../../services/BlogCategoryService";
import BaseController from "../BaseController"

export default class BlogCategoriesAdminController extends BaseController {

    constructor() {
        super();
        this.initializeRouter();
    }
    protected initializeRouter(): void {
        this.initGetRouter();
        this.initPostPutDeleteRouter();
    }

    private initGetRouter() {
        this._router.get("/v1/admin/blog-categories/all", this.getCategoryAll);
        this._router.get("/v1/admin/blog-categories", this.getCategoryPaging);
        this._router.get("/v1/admin/blog-categories/:id", this.getCategoryDetail);
    }
    private initPostPutDeleteRouter() {
        this._router.post("/v1/admin/blog-categories", this.createCategory);
        this._router.put("/v1/admin/blog-categories", this.updateCategory);
        this._router.delete("/v1/admin/blog-categories/:id", this.deleteCategory);
    }

    private getCategoryAll = async (request: express.Request, response: express.Response) => {
        try {
            let service = new BlogCategoryService();
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

    private getCategoryPaging = async (request: express.Request, response: express.Response) => {
        try {
            let service = new BlogCategoryService();
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

    private getCategoryDetail = async (request: express.Request, response: express.Response) => {
        try {
            let { id } = request.params as any;
            let service = new BlogCategoryService();
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
    private createCategory = async (request: express.Request, response: express.Response) => {
        try {
            let service = new BlogCategoryService();
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

    private updateCategory = async (request: express.Request, response: express.Response) => {
        try {
            let service = new BlogCategoryService();
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

    private deleteCategory = async (request: express.Request, response: express.Response) => {
        try {
            let { id } = request.params as any;
            let service = new BlogCategoryService();
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
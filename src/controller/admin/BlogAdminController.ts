import express = require("express");
import BlogService from "../../services/BlogService";
import BaseController from "../BaseController"

export default class BlogAdminController extends BaseController {
    constructor() {
        super();
        this.initializeRouter();
    }
    protected initializeRouter(): void {
        this.initGetRouter();
        this.initPostPutDeleteRouter();
    }
    private initGetRouter() {
        this._router.get("/v1/admin/blog", this.getBlogPaging);
        this._router.get("/v1/admin/blog/:id", this.getBlogDetail);
    }
    private initPostPutDeleteRouter() {
        this._router.post("/v1/admin/blog", this.createBlog);
        this._router.put("/v1/admin/blog", this.updateBlog);
        this._router.delete("/v1/admin/blog/:id", this.deleteBlog);
    }

    private getBlogPaging = async (request: express.Request, response: express.Response) => {
        try {
            let service = new BlogService();
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

    private getBlogDetail = async (request: express.Request, response: express.Response) => {
        try {
            let { id } = request.params as any;
            let service = new BlogService();
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

    private createBlog = async (request: express.Request, response: express.Response) => {
        try {
            let service = new BlogService();
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

    private updateBlog = async (request: express.Request, response: express.Response) => {
        try {
            let service = new BlogService();
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

    private deleteBlog = async (request: express.Request, response: express.Response) => {
        try {
            let { id } = request.params as any;
            let service = new BlogService();
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